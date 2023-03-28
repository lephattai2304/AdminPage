from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import User, Permission, Role
from rest_framework import exceptions, viewsets, status, generics, mixins
from usersApp.serializers import UserSerializer, PermissionSerializer, RoleSerializer
from usersApp.authentication import generate_access_token, JWTAuthentication
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from adminProject.pagination import CustomPagination
from usersApp.permisions import ViewPermissions


# Create your views here.
@api_view(['POST'])
def register(request):
    data = request.data
    request.data['role_id'] = 1
    request.data.update({
        'role': request.data['role_id']
    })
    if data['password'] != data['password_confirm']:
        raise exceptions.APIException('The password do not match!')
    serializer = UserSerializer(data= data)
    serializer.is_valid(raise_exception=True)
    serializer.save()
    return Response(serializer.data)

@api_view(['POST'])
def login(request):
    email = request.data.get('email')
    password = request.data.get('password')

    user = User.objects.filter(email= email).first()

    if user is None:
        raise exceptions.AuthenticationFailed('User not found!')
 
    if not user.check_password(password):
        raise exceptions.AuthenticationFailed('Incorrect password!')
    
    response = Response()
    token = generate_access_token(user)
    response.set_cookie(key='jwt', value=token, httponly=True)
    response.data = {
        'jwt' : token
    }
    return response

@api_view(['POST'])
def logout(_):
    response = Response()
    response.delete_cookie(key='jwt')
    response.data = {
        'message' : 'Success'

    }
    return response
class AuthenticatedUser(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request):
        data = UserSerializer(request.user).data
        data['permissions'] = [p['name'] for p in data['role']['permission']]

        return Response({
            'data' : data
        })

class PermissionAPIView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request):
        permission = Permission.objects.all()
        serializer = PermissionSerializer(permission, many = True)


        return Response({
            'data' : serializer.data
        })

class RoleViewSet(viewsets.ViewSet):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated & ViewPermissions]
    permission_object = "roles"  

    def list(self, request):
        role = Role.objects.all()
        serializer = RoleSerializer(role, many = True)
        return Response({
            'data' : serializer.data
            }, status= status.HTTP_201_CREATED)

    def create(self, request):
        serializer = RoleSerializer(data = request.data)
        serializer.is_valid(raise_exception= True)
        serializer.save()
        return Response({
            'data' : serializer.data
        })

    def retrieve(self, request, pk = None):
        role = Role.objects.get(id = pk)
        serializer = RoleSerializer(role)
        return Response({
            'data' : serializer.data
        })

    def update(self, request, pk = None):
        role = Role.objects.get(id = pk)
        serializer = RoleSerializer(instance=role, data = request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response({
            'data' : serializer.data
        }, status=status.HTTP_202_ACCEPTED)

    def destroy(self, request, pk = None):
        role = Role.objects.get(id = pk)
        role.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

class UserGenericAPIView(
    generics.GenericAPIView, mixins.ListModelMixin,
    mixins.CreateModelMixin, mixins.RetrieveModelMixin,
    mixins.UpdateModelMixin, mixins.DestroyModelMixin
):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated & ViewPermissions]  
    permission_object = "users"
    queryset = User.objects.all()
    serializer_class = UserSerializer
    pagination_class = CustomPagination
    
    def get(self, request, pk=None):
        if pk:
            return Response({
                'data': self.retrieve(request, pk).data
            })

        return self.list(request)
    
    def post(self, request):
        request.data.update({
            'password' : '2',
            'role' : request.data['role_id']
        })
        return self.create(request)
    
    
    def put(self, request, pk):
        if request.data['role_id']:
            request.data.update({
                'role' : request.data['role_id']
            })
        return self.partial_update(request, pk)
        
    def delete(self, request, pk):
        return self.destroy(request, pk)

class ProfileInfoAPIView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated] 

    def put (self, request):
        user = request.user
        serializer = UserSerializer(user, data = request.data, partial=True) 
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data) 
    
class ProfilePasswordAPIView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated] 

    def put(self, request, pk = None):
        user = request.user
        
        if request.data['password'] != request.data['password_confirm']:
            raise exceptions.ValidationError('Password do not match')

        user.set_password(request.data['password'])
        user.save()

        serializer = UserSerializer(instance =user) 
        # serializer.is_valid(raise_exception=True)
        # serializer.save()
        return Response(serializer.data) 
    
'''
@api_view(['GET'])
def users(request):
    users = User.objects.all()
    serializer = UserSerializer(users, many = True)
    return Response(serializer.data)
'''