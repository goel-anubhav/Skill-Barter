from django.contrib import admin
from django.core.mail import send_mail
from django.conf import settings
from .models import User

@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display = ['id','full_name', 'email', 'is_approved']
    list_filter = ['is_approved']
    search_fields = ['full_name', 'email']

    def save_model(self, request, obj, form, change):
        if 'is_approved' in form.changed_data and obj.is_approved:
            # Send approval notification
            subject = 'Your registration is approved'
            message = f'Dear {obj.full_name},\n\nYour registration has been approved by the admin.\n\nThank you!'
            from_email = settings.EMAIL_HOST_USER
            recipient_list = [obj.email]

            try:
                send_mail(subject, message, from_email, recipient_list, fail_silently=False)
            except Exception as e:
                print(str(e))

        super().save_model(request, obj, form, change)
