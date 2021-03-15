from django.db.models.signals import post_save , post_delete

from django.dispatch import receiver 

from .models import MemberModel  

from api.third_party.trello.TrelloResource import TrelloResource 

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
        trello_resource = TrelloResource(instance)
        trello_id = trello_resource.GiveAccess() 

        if trello_id :
            instance.trello_access = 1
            instance.trello_id = trello_id 

        instance.save()
        print('user created ')


@receiver(post_delete,sender=MemberModel,weak=False)
def handel_user_delete(sender,instance,**kwargs):

    """ 
        remove access to resource after deleting user 
        
    """
    
    trello_resource = TrelloResource(instance)

    if trello_resource.RevokeAccess():
        print('trello access revoked')
    else:
        print('trello access not revoked')

    print('deleting {}'.format(instance.email) )

