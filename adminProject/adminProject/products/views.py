from django.shortcuts import render
from rest_framework.response import Response
from products.models import Product
from rest_framework import exceptions, viewsets, status, generics, mixins
from rest_framework.views import APIView
from products.serializers import ProductSerializer
from usersApp.authentication import JWTAuthentication
from rest_framework.permissions import IsAuthenticated
from adminProject.pagination import CustomPagination
from django.core.files.storage import default_storage

# Create your views here.

class ProductGenericAPIView(
    generics.GenericAPIView, mixins.ListModelMixin,
    mixins.CreateModelMixin, mixins.RetrieveModelMixin,
    mixins.UpdateModelMixin, mixins.DestroyModelMixin
):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]  

    queryset = Product.objects.all()
    serializer_class = ProductSerializer

    pagination_class = CustomPagination

    def get(self, request, pk = None):
        if pk:
            return self.retrieve(request)
        return self.list(request)
    
    def post(self, request):
        return self.create(request)
    
    def put(self, request, pk):
        return self.partial_update(request, pk)
    
    def delete(self, request, pk):
        return self.destroy(request, pk)

class FileUploadView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]  

    def post(self, request, pk = None):
        file = request.FILES['image']
        file_name = default_storage.save(file.name, file)
        url = default_storage.url(file_name)

        return Response({
            'url' : 'http://127.0.0.1:8000/api' + url
        })