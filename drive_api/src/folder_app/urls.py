from django.urls import path
from .views import GetAllUsers, AddNewUser, RemoveUser

urlpatterns = [
    path('all_users', GetAllUsers.as_view(), name='all_users'),
    path('add_user', AddNewUser.as_view(), name='add_user'),
    path('remove_user', RemoveUser.as_view(), name='remove_user'),
]
