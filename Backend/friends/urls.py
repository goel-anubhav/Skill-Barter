from django.urls import path
from .views import send_request, list_requests, respond_request, list_notifications, mark_notification_as_read, rate_user, list_ratings, get_average_rating
from .views import get_sent_requests
from .views import get_scores_by_email
urlpatterns = [
    path('send-request/', send_request, name='send_request'),
    path('list-requests/<str:receiver_email>/', list_requests, name='list_requests'),
    path('respond-request/<int:request_id>/', respond_request, name='respond_request'),
    path('notifications/<int:user_id>/', list_notifications, name='list_notifications'),
    path('notifications/read/<int:notification_id>/', mark_notification_as_read, name='mark_notification_as_read'),
    path('rate-user/', rate_user, name='rate_user'),
    path('ratings/<int:user_id>/', list_ratings, name='list_ratings'),
    path('average-rating/<int:user_id>/', get_average_rating, name='get_average_rating'),
    path('sent-requests/<str:email>/', get_sent_requests, name='get_sent_requests'),
    path('scores/<str:email>/', get_scores_by_email, name='get_scores_by_email'),
    
]
