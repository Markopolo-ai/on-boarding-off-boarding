from django.db import models
from django.db.models.signals import post_save
# Create your models here.


class MemberModel(models.Model):
    email        = models.EmailField(unique=True)     
    git_access   = models.BooleanField(default=False)
    slack_access = models.BooleanField(default=False)
    drive_access = models.BooleanField(default=False) 
    created_at   = models.DateTimeField(auto_now_add=True)
    updated_at   = models.DateTimeField(auto_now=True)
    


 

# from django.dispatch import receiver 

# # from .models import MemberModel  

# @receiver(post_save,sender=MemberModel,weak=False)
# def handel_user_create(sender,instance,created,**kwargs):
#     if created:
#         instance.git_access = 1 
#         instance.save()
#         print('user created ')

# post_save.connect(handel_user_create,sender=MemberModel)