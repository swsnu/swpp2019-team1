'''
matchmaker urls
'''
from django.urls import path
from matchmaker import views

urlpatterns = [
    path('', views.match, name='api.match'),
    path('new/', views.match_new, name='api.match.new'),
    path('search', views.search, name='api.match.search'),
    path('<int:match_id>/', views.match_detail, name='api.match.detail'),
]
