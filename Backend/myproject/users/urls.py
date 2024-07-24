# users/urls.py




# users/urls.py

from django.urls import path
from .views import UserCreateView, UserLoginView

urlpatterns = [
    path('signup/', UserCreateView.as_view(), name='signup'),
    path('login/', UserLoginView.as_view(), name='login'),
   
]
