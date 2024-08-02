from rest_framework import generics, permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.authtoken.models import Token
from .models import User
from django.contrib.auth import authenticate
from .serializers import UserCreateSerializer, UserSerializer
from django.core.mail import send_mail
from django.utils import timezone
from datetime import timedelta
import random

class UserCreateView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserCreateSerializer
    permission_classes = [permissions.AllowAny]

    def perform_create(self, serializer):
        user = serializer.save()
        otp = str(random.randint(100000, 999999))
        user.otp_code = otp
        user.otp_expiry = timezone.now() + timedelta(minutes=10)
        user.save()
        # Send OTP via email (or any other method)
        send_mail(
            'Your OTP Code',
            f'Your OTP code is {otp}',
            'skillbarter.in@gmail.com',
            [user.email],
            fail_silently=False,
        )

class UserLoginView(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        email = request.data.get('email')
        password = request.data.get('password')
        user = authenticate(request, email=email, password=password)

        if user is not None:
            if not user.is_otp_verified:
                return Response({'error': 'OTP not verified'}, status=status.HTTP_400_BAD_REQUEST)
            token, _ = Token.objects.get_or_create(user=user)
            return Response({'token': token.key, 'user': UserSerializer(user).data})
        return Response({'error': 'Invalid Credentials'}, status=status.HTTP_400_BAD_REQUEST)

class OTPVerifyView(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        email = request.data.get('email')
        otp = request.data.get('otp')
        try:
            user = User.objects.get(email=email)
            if user.otp_code == otp and timezone.now() < user.otp_expiry:
                user.is_otp_verified = True
                user.save()
                return Response({'message': 'OTP verified successfully'})
            return Response({'error': 'Invalid or expired OTP'}, status=status.HTTP_400_BAD_REQUEST)
        except User.DoesNotExist:
            return Response({'error': 'User not found'}, status=status.HTTP_400_BAD_REQUEST)

class UserProfilePictureView(APIView):
    permission_classes = [permissions.AllowAny]

    def get(self, request, email):
        try:
            user = User.objects.get(email=email)
            if user.profile_picture:
                return Response({'profile_picture': user.profile_picture.url}, status=status.HTTP_200_OK)
            return Response({'error': 'Profile picture not found'}, status=status.HTTP_404_NOT_FOUND)
        except User.DoesNotExist:
            return Response({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)
