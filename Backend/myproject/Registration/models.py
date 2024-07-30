from django.db import models

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
