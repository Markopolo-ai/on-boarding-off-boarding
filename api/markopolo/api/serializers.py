from rest_framework import serializers 
from .models import MemberModel 

class MemberSerializer(serializers.ModelSerializer):

    class Meta:
        model  = MemberModel
        fields = ['id','email','git_access','slack_access','drive_access'] 