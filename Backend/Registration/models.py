from django.db import models
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.core.mail import EmailMessage
from django.conf import settings

class User(models.Model):
    full_name = models.CharField(max_length=255)
    email = models.EmailField(unique=True)
    phone_number = models.CharField(max_length=15)
    city = models.CharField(max_length=100)
    state = models.CharField(max_length=100)
    qualification = models.CharField(max_length=100)
    year_of_experience = models.IntegerField()
    skills = models.TextField()
    certification1 = models.FileField(upload_to='certifications/', blank=True, null=True)
    certification2 = models.FileField(upload_to='certifications/', blank=True, null=True)
    desired_skills = models.TextField()
    is_approved = models.BooleanField(default=False)
    profile_picture = models.ImageField(upload_to='received_profile_pictures/', null=True, blank=True)

    def __str__(self):
        return self.full_name

# Signal to send an HTML email after a new user is created
@receiver(post_save, sender=User)
def send_registration_email(sender, instance, created, **kwargs):
    if created:
        subject = 'New User Registration - Approval Required'
        review_url = "http://api.skillbarter.in/admin/Registration/user"
        # review_url = "http://127.0.0.1:8000/admin/Registration/user"


        message = f"""
        <html>
        <body>
            <p>Hello Admin,</p>
            <p>A new user has registered on the platform. Please find the details below:</p>
            <table>
                <tr><td><strong>Full Name</strong></td><td>: {instance.full_name}</td></tr>
                <tr><td><strong>Email</strong></td><td>: {instance.email}</td></tr>
                <tr><td><strong>Phone Number</strong></td><td>: {instance.phone_number}</td></tr>
                <tr><td><strong>City</strong></td><td>: {instance.city}</td></tr>
                <tr><td><strong>State</strong></td><td>: {instance.state}</td></tr>
                <tr><td><strong>Qualification</strong></td><td>: {instance.qualification}</td></tr>
                <tr><td><strong>Years of Experience</strong></td><td>: {instance.year_of_experience}</td></tr>
                <tr><td><strong>Skills</strong></td><td>: {instance.skills}</td></tr>
                <tr><td><strong>Desired Skills</strong></td><td>: {instance.desired_skills}</td></tr>
            </table>
            <p>Please review and approve the user to grant them access to the dashboard.</p>
            <p><a href="{review_url}">Click here to review and approve the user</a></p>
            <p>Thank you,<br>The Team<br>Skill Barter</p>
        </body>
        </html>
        """

        # List of admin emails
        admin_emails = ['abhav894@gmail.com', 'amarjeet7@gmail.com', 'amarjeet@shivalikprints.com','rkthakur941@gmail.com']

        # Ensure the EmailMessage 'to' parameter is passed as a list of strings
        email = EmailMessage(subject, message, settings.DEFAULT_FROM_EMAIL, admin_emails)
        email.content_subtype = "html"  # Main content is now text/html
        email.send()
