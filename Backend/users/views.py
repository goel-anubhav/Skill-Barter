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
import threading



class UserCreateView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserCreateSerializer
    permission_classes = [permissions.AllowAny]

    def perform_create(self, serializer):
        user = serializer.save()
        otp = str(random.randint(100000, 999999))
        user.otp_code = otp
        user.otp_expiry = timezone.now() + timedelta(seconds=150)
        user.save()

        # Send OTP via email (or any other method)
        send_mail(
            'Your OTP Code',
            f'Your OTP code is {otp}',
            'skillbarter.in@gmail.com',
            [user.email],
            fail_silently=False,
        )

        # Schedule a task to delete the user if OTP is not verified within 150 seconds
        threading.Timer(150, self.delete_unverified_user, args=[user.id]).start()

    def delete_unverified_user(self, user_id):
        try:
            user = User.objects.get(id=user_id)
            if not user.is_otp_verified:
                user.delete()
        except User.DoesNotExist:
            pass

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
                return Response({'message': 'OTP verified successfully'}, status=status.HTTP_200_OK)
            return Response({'error': 'Invalid or expired OTP'}, status=status.HTTP_400_BAD_REQUEST)
        except User.DoesNotExist:
            return Response({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)

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






from .serializers import PasswordResetRequestSerializer, PasswordResetConfirmSerializer

class PasswordResetRequestView(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        serializer = PasswordResetRequestSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        email = serializer.validated_data['email']

        try:
            user = User.objects.get(email=email)
            otp = str(random.randint(100000, 999999))
            user.otp_code = otp
            user.otp_expiry = timezone.now() + timedelta(minutes=10)
            user.save()
            # Send OTP via email (or any other method)
            send_mail(
                'Password Reset OTP Code',
                f'Your OTP code for password reset is {otp}',
                'skillbarter.in@gmail.com',
                [user.email],
                fail_silently=False,
            )
            return Response({'message': 'OTP sent to email'}, status=status.HTTP_200_OK)
        except User.DoesNotExist:
            return Response({'error': 'User with this email does not exist'}, status=status.HTTP_404_NOT_FOUND)

class PasswordResetConfirmView(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        serializer = PasswordResetConfirmSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        email = serializer.validated_data['email']
        otp = serializer.validated_data['otp']
        new_password = serializer.validated_data['new_password']

        try:
            user = User.objects.get(email=email)
            if user.otp_code == otp and timezone.now() < user.otp_expiry:
                user.set_password(new_password)
                user.otp_code = None  # Clear OTP after successful password reset
                user.otp_expiry = None
                user.save()
                return Response({'message': 'Password reset successfully'}, status=status.HTTP_200_OK)
            return Response({'error': 'Invalid or expired OTP'}, status=status.HTTP_400_BAD_REQUEST)
        except User.DoesNotExist:
            return Response({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)
