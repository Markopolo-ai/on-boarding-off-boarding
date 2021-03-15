from django.db.models.signals import post_save , post_delete

from django.dispatch import receiver 

from .models import MemberModel  

@receiver(post_save,sender=MemberModel,weak=False)
def handel_user_create(sender,instance,created,**kwargs):
    if created:
        
        """
        give access to git and other resources
        
        hear if success change flag to 1
        
        """
        instance.git_access   = 1 
        instance.slack_access = 1
        instance.drive_access = 1
        instance.save()
        print('user created ')


@receiver(post_delete,sender=MemberModel,weak=False)
def handel_user_delete(sender,instance,**kwargs):
    """ 
        remove access to resource after deleting user 
        
    """
    print('deleting {}',instance.email)

