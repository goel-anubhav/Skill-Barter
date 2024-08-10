from rest_framework import serializers
from .models import User
from django.utils import timezone
from datetime import timedelta

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'full_name', 'email', 'phone_number', 'profile_picture']

class UserCreateSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    otp = serializers.CharField(write_only=True, required=False)

    class Meta:
        model = User
        fields = ['full_name', 'email', 'phone_number', 'password', 'profile_picture', 'otp']

    def create(self, validated_data):
        otp = validated_data.pop('otp', None)
        user = User.objects.create_user(
            full_name=validated_data['full_name'],
            email=validated_data['email'],
            phone_number=validated_data['phone_number'],
            password=validated_data['password'],
            profile_picture=validated_data.get('profile_picture')
        )
        if otp:
            if user.otp_code == otp and timezone.now() < user.otp_expiry:
                user.is_otp_verified = True
                user.save()
            else:
                raise serializers.ValidationError("Invalid or expired OTP")
        return user




class PasswordResetRequestSerializer(serializers.Serializer):
    email = serializers.EmailField()

class PasswordResetConfirmSerializer(serializers.Serializer):
    email = serializers.EmailField()
    otp = serializers.CharField()
    new_password = serializers.CharField(write_only=True)
