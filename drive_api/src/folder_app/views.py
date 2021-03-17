from django.shortcuts import render
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView, Response
from .services import list_all_user, add_user, remove_user

class GetAllUsers(APIView):

    def get(self, request):
        
        file_id = "1uRssvW3FHpSHh7YYtAy_qrHQNlPDDU7d"
        response = {
            'data' : list_all_user(file_id)
        }

        return Response(data=response, status=status.HTTP_200_OK)

class AddNewUser(APIView):

    def post(self, request):

        data = request.data
        email_id = data['email_id']
        file_id = data['file_id']

        response = {
            'data' : add_user(email_id, file_id)
        }

        return Response(data=response, status=status.HTTP_200_OK)

class RemoveUser(APIView):

    def post(self, request):

        data = request.data
        id = data['id']
        file_id = data['file_id']

        response = {
            'data' : remove_user(id, file_id)
        }

        return Response(data=response, status=status.HTTP_200_OK)