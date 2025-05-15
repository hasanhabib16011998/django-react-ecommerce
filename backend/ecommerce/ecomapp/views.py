from django.shortcuts import render
from django.http import JsonResponse
from rest_framework.response import Response
from rest_framework.decorators import api_view
#from .products import products
from .serializer import ProductsSerializer
from .models import Products
# Create your views here.

@api_view(['GET'])
def getRoutes(request):
    return Response('Hello Hasan')


@api_view(['GET'])
def getProducts(request):
    products = Products.objects.all()
    serializer = ProductsSerializer(products, many=True, context={'request': request})  # Pass request in context
    return Response(serializer.data)
