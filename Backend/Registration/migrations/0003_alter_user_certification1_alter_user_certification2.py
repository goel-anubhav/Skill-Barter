# Generated by Django 5.0.7 on 2024-07-28 05:25

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Registration', '0002_user_profile_picture'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='certification1',
            field=models.FileField(blank=True, null=True, upload_to='certifications/'),
        ),
        migrations.AlterField(
            model_name='user',
            name='certification2',
            field=models.FileField(blank=True, null=True, upload_to='certifications/'),
        ),
    ]
