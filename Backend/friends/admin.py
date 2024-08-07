from django.contrib import admin
from .models import FriendRequest, Notification, Rating

class FriendRequestAdmin(admin.ModelAdmin):
    list_display = ('id', 'sender', 'receiver_email', 'status', 'timestamp')
    list_filter = ('status', 'timestamp')
    search_fields = ('sender__email', 'receiver_email')

class NotificationAdmin(admin.ModelAdmin):
    list_display = ('id', 'user', 'message', 'is_read', 'timestamp')
    list_filter = ('is_read', 'timestamp')
    search_fields = ('user__email', 'message')

class RatingAdmin(admin.ModelAdmin):
    list_display = ('id', 'rater', 'ratee', 'score', 'timestamp')
    list_filter = ('score', 'timestamp')
    search_fields = ('rater__email', 'ratee__email', 'score')

admin.site.register(FriendRequest, FriendRequestAdmin)
admin.site.register(Notification, NotificationAdmin)
admin.site.register(Rating, RatingAdmin)
