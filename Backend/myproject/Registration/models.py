

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
    certification1 = models.CharField(max_length=255, blank=True, null=True)
    certification2 = models.CharField(max_length=255, blank=True, null=True)
    desired_skills = models.TextField()
    is_approved = models.BooleanField(default=False)

    def __str__(self):
        return self.full_name
