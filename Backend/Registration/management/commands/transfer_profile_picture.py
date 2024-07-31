import os
from django.core.files import File
from django.core.management.base import BaseCommand
from django.db import connections
from Registration.models import User

class Command(BaseCommand):
    help = 'Transfer profile pictures from db.sqlite3 to app registration'

    def handle(self, *args, **kwargs):
        source_connection = connections['default']
        source_cursor = source_connection.cursor()

        # Users app ke UserProfile table se profile pictures ka path fetch karna
        source_cursor.execute("SELECT id, profile_picture FROM users_user")
        rows = source_cursor.fetchall()

        for row in rows:
            user_id, profile_picture_path = row
            if profile_picture_path:
                # Assuming the profile pictures are stored in 'media/profile_pictures' directory
                full_path = os.path.join('media', 'profile_pictures', os.path.basename(profile_picture_path))
                self.stdout.write(self.style.NOTICE(f'Processing user {user_id} with profile picture {full_path}'))
                if os.path.exists(full_path):
                    with open(full_path, 'rb') as f:
                        received_profile_picture = ReceivedProfilePicture(
                            user_id=user_id
                        )
                        received_profile_picture.profile_picture.save(os.path.basename(full_path), File(f), save=True)
                    self.stdout.write(self.style.SUCCESS(f'Successfully transferred profile picture for user {user_id}'))
                else:
                    self.stdout.write(self.style.WARNING(f'Profile picture file not found for user {user_id} at {full_path}'))
            else:
                self.stdout.write(self.style.WARNING(f'No profile picture found for user {user_id}'))