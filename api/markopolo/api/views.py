from django.shortcuts import render

# Create your views here.

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated


class HelloView(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request):
        content = {'message': 'Hello, World!'}
        return Response(content)


class MemberViews(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self,request):
        content = {'message':'all'}
        return Response(content)
        # create member 

    def post(self,request):
        content = {'message':'created'}
        return Response(content)
        # create member 

    def put(self,request):
        content = {'message':'update'}
        return Response(content)
        # create member 

    def delete(self,request):
        content = {'message':'deleted'}
        return Response(content)

        # create member 
