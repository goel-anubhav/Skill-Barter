# users/serializers.py

from rest_framework import serializers
from .models import User

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'full_name', 'email', 'phone_number', 'profile_picture']

class UserCreateSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['full_name', 'email', 'phone_number', 'password', 'profile_picture']

    def create(self, validated_data):
        user = User.objects.create_user(
            full_name=validated_data['full_name'],
            email=validated_data['email'],
            phone_number=validated_data['phone_number'],
            password=validated_data['password'],
            profile_picture=validated_data.get('profile_picture')
        )
        return user
