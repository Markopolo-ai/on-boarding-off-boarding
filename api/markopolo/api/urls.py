

from django.urls import path , include ,re_path
from rest_framework_simplejwt import views as jwt_views
from . import views 
from rest_framework.routers import DefaultRouter 

router = DefaultRouter()
router.register(r'member',views.MemberViewSet)


urlpatterns = [

    path('login', jwt_views.TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh', jwt_views.TokenRefreshView.as_view(), name='token_refresh'),
    path('',include(router.urls)) ,
    
]
