# users/urls.py




# users/urls.py



from django.urls import path
from .views import UserCreateView, UserLoginView, OTPVerifyView , UserProfilePictureView

urlpatterns = [
    path('signup/', UserCreateView.as_view(), name='signup'),
    path('login/', UserLoginView.as_view(), name='login'),
    path('verify-otp/', OTPVerifyView.as_view(), name='verify_otp'),
    path('profile-picture/<str:email>/', UserProfilePictureView.as_view(), name='profile_picture'),
]









