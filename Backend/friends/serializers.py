from rest_framework import serializers
from .models import FriendRequest, Notification, Rating

class FriendRequestSerializer(serializers.ModelSerializer):
    sender_email = serializers.EmailField(source='sender.email', read_only=True)

    class Meta:
        model = FriendRequest
        fields = ['id', 'sender', 'sender_email', 'receiver_email', 'message', 'status', 'timestamp']

class NotificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Notification
        fields = ['id', 'user', 'message', 'is_read', 'timestamp']

class RatingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Rating
        fields = ['id', 'rater', 'ratee', 'score', 'comment', 'timestamp']








