from django.shortcuts import render
from django.http import HttpResponse
from rest_framework.response import Response
from orders.models import Order, OrderItem
from rest_framework import exceptions, viewsets, status, generics, mixins
from rest_framework.views import APIView
from orders.serializers import OrderSerializer, OrderItemSerializer
from usersApp.authentication import JWTAuthentication
from rest_framework.permissions import IsAuthenticated
from adminProject.pagination import CustomPagination
import csv
from django.db import connection

# Create your views here.

class OrderGenericAPIView(
    generics.GenericAPIView, mixins.ListModelMixin, mixins.RetrieveModelMixin
):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]  

    queryset = Order.objects.all()
    serializer_class = OrderSerializer

    pagination_class = CustomPagination

    def get(self, request, pk = None):
        if pk:
            return self.retrieve(request)
        return self.list(request)
    
class ExportAPIView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]  

    def get(self ,request):
        response = HttpResponse(content_type = 'text/csv')
        response['content-Disposition'] = 'attachment; filename =orders.csv'

        orders = Order.objects.all()
        writer = csv.writer(response)

        writer.writerow(['ID','Name', 'Email', 'Product Title', 'Price', 'Quantity'])

        for order in orders:
            writer.writerow([order.id, order.name, order.email, '', '', ''])
            orderItems = OrderItem.objects.all().filter(order_id = order.id)

            for item in orderItems:
                writer.writerow(['', '', '', item.product_title, item.price, item.quantity])   
        return response
    
class ChartAPIView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, _):
        with connection.cursor() as cursor:
            cursor.execute("""
            SELECT DATE_FORMAT(o.created_at, '%Y-%m-%d') as date, sum(i.quantity * i.price) as sum
            FROM orders_order as o
            JOIN orders_orderitem as i ON o.id = i.order_id
            GROUP BY date
            """) 
            row = cursor.fetchall()
        data =[{
            'date' : result[0],
            'sum' : result[1]
        } for result in row]

        return Response({
            "data" : data
        })