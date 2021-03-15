from django.shortcuts import render

# Create your views here.

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import permissions ,viewsets
from api.models import MemberModel 
from api.serializers import MemberSerializer


    
class MemberViewSet(viewsets.ModelViewSet):
    queryset = MemberModel.objects.all()
    serializer_class = MemberSerializer
    permission_classes  = [IsAuthenticated] 

    # todo : custom method 
