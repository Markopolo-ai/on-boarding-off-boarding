from django.db import models
from django.db.models.signals import post_save
# Create your models here.


class MemberModel(models.Model):
    email        = models.EmailField(unique=True)     
    git_access   = models.BooleanField(default=False)
    slack_access = models.BooleanField(default=False)
    drive_access = models.BooleanField(default=False) 
    trello_access= models.BooleanField(default=False)
    trello_id    = models.CharField(blank=True,max_length=291)
    created_at   = models.DateTimeField(auto_now_add=True)
    updated_at   = models.DateTimeField(auto_now=True)







    


 

