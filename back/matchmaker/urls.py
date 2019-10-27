from django.urls import path
from matchmaker import views

urlpatterns = [
    path('match/', views.match, name='api.match'),
    path('match/new/', views.match_new, name='api.match.new'),
]
