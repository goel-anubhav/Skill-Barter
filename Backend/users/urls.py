from django.urls import path
from .views import UserCreateView, UserLoginView, OTPVerifyView, UserProfilePictureView, PasswordResetRequestView, PasswordResetConfirmView

urlpatterns = [
    path('signup/', UserCreateView.as_view(), name='signup'),
    path('login/', UserLoginView.as_view(), name='login'),
    path('verify-otp/', OTPVerifyView.as_view(), name='verify_otp'),
    path('profile-picture/<str:email>/', UserProfilePictureView.as_view(), name='profile_picture'),
    path('password-reset/', PasswordResetRequestView.as_view(), name='password_reset'),
    path('password-reset-confirm/', PasswordResetConfirmView.as_view(), name='password_reset_confirm'),
]