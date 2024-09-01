from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import get_user_model
from .models import FriendRequest, Notification, Rating
from .serializers import FriendRequestSerializer, NotificationSerializer, RatingSerializer
from django.db.models import Avg

User = get_user_model()

@api_view(['POST'])
def send_request(request):
    sender_email = request.data.get('sender')
    receiver_email = request.data.get('receiver')
    message = request.data.get('message')
    try:
        sender_user = User.objects.get(email=sender_email)
    except User.DoesNotExist:
        return Response({'error': 'Sender does not exist'}, status=status.HTTP_400_BAD_REQUEST)
    
    friend_request = FriendRequest(sender=sender_user, receiver_email=receiver_email, message=message)
    friend_request.save()
    
    # Create a notification for the receiver
    try:
        receiver_user = User.objects.get(email=receiver_email)
        notification = Notification(user=receiver_user, message=f'You have a new friend request from {sender_user.email}')
        notification.save()
    except User.DoesNotExist:
        pass  # If the receiver is not a registered user, we won't create a notification

    return Response({'success': 'Friend request sent'}, status=status.HTTP_201_CREATED)

@api_view(['GET'])
def list_requests(request, receiver_email):
    friend_requests = FriendRequest.objects.filter(receiver_email=receiver_email)
    serializer = FriendRequestSerializer(friend_requests, many=True)
    return Response(serializer.data)

@api_view(['PATCH'])
def respond_request(request, request_id):
    try:
        friend_request = FriendRequest.objects.get(id=request_id)
        status = request.data.get('status')
        receiver_email = request.data.get('receiver')

        if status not in ['accepted', 'declined']:
            return Response({'error': 'Invalid status'}, status=400)

        if friend_request.receiver_email != receiver_email:
            return Response({'error': 'You are not authorized to respond to this request'}, status=403)

        friend_request.status = status
        friend_request.save()

        if status == 'accepted':
            sender = friend_request.sender
            notification_message = f"Your friend request to {receiver_email} has been accepted."
            Notification.objects.create(user=sender, message=notification_message)

        return Response({'success': f'Request {status}'}, status=200)

    except FriendRequest.DoesNotExist:
        return Response({'error': 'Friend request not found'}, status=404)
    except Exception as e:
        return Response({'error': str(e)}, status=500)
    
@api_view(['GET'])
def list_notifications(request, user_id):
    try:
        user = User.objects.get(id=user_id)
    except User.DoesNotExist:
        return Response({'error': 'User does not exist'}, status=status.HTTP_400_BAD_REQUEST)
    
    notifications = Notification.objects.filter(user=user, is_read=False)
    serializer = NotificationSerializer(notifications, many=True)
    return Response(serializer.data)

@api_view(['PATCH'])
def mark_notification_as_read(request, notification_id):
    try:
        notification = Notification.objects.get(id=notification_id)
    except Notification.DoesNotExist:
        return Response({'error': 'Notification does not exist'}, status=status.HTTP_400_BAD_REQUEST)
    
    notification.is_read = True
    notification.save()
    return Response({'success': 'Notification marked as read'}, status=status.HTTP_200_OK)

@api_view(['POST'])
def rate_user(request):
    rater_email = request.data.get('rater_email')
    ratee_email = request.data.get('ratee_email')
    score = request.data.get('score')
    comment = request.data.get('comment', '')

    try:
        rater = User.objects.get(email=rater_email)
        ratee = User.objects.get(email=ratee_email)
    except User.DoesNotExist:
        return Response({'error': 'User does not exist'}, status=status.HTTP_400_BAD_REQUEST)

    rating = Rating(rater=rater, ratee=ratee, score=score, comment=comment)
    rating.save()
    return Response({'success': 'Rating submitted'}, status=status.HTTP_201_CREATED)

@api_view(['GET'])
def list_ratings(request, user_id):
    try:
        user = User.objects.get(id=user_id)
    except User.DoesNotExist:
        return Response({'error': 'User does not exist'}, status=status.HTTP_400_BAD_REQUEST)
    
    ratings = Rating.objects.filter(ratee=user)
    serializer = RatingSerializer(ratings, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def get_average_rating(request, user_id):
    try:
        user = User.objects.get(id=user_id)
    except User.DoesNotExist:
        return Response({'error': 'User does not exist'}, status=status.HTTP_400_BAD_REQUEST)
    
    average_rating = Rating.objects.filter(ratee=user).aggregate(Avg('score'))['score__avg']
    return Response({'average_rating': average_rating}, status=status.HTTP_200_OK)




@api_view(['GET'])
def get_sent_requests(request, email):
    try:
        sender = User.objects.get(email=email)
        sent_requests = FriendRequest.objects.filter(sender=sender)
        serializer = FriendRequestSerializer(sent_requests, many=True)
        return Response(serializer.data, status=200)
    except User.DoesNotExist:
        return Response({'error': 'User not found'}, status=404)
    




@api_view(['GET'])
def get_notifications(request, user_id):
    try:
        user = User.objects.get(id=user_id)
        notifications = Notification.objects.filter(user=user)
        serializer = NotificationSerializer(notifications, many=True)
        return Response(serializer.data, status=200)
    except User.DoesNotExist:
        return Response({'error': 'User not found'}, status=404)    
    

@api_view(['GET'])
def get_scores_by_email(request, email):
    try:
        # Fetch ratings where the email is either the rater or the ratee
        ratings = Rating.objects.filter(rater__email=email) | Rating.objects.filter(ratee__email=email)
        serializer = RatingSerializer(ratings, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    except User.DoesNotExist:
        return Response({'error': 'User does not exist'}, status=status.HTTP_400_BAD_REQUEST)









