
from django.contrib import admin
from .models import User

@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display = ('id', 'email', 'full_name', 'phone_number', 'is_active', 'is_staff')
    search_fields = ('email', 'full_name')
