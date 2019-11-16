'''
matchmaker urls
'''
from django.urls import path
from matchmaker import views
from . import nlp

urlpatterns = [
    path('', views.match, name='api.match'),
    path('new/', views.match_new, name='api.match.new'),
    path('hot/', views.match_hot, name='api.match.hot'),
    path('recommend/', views.match_recommend, name='api.match.recommend'),
    path('search', views.search, name='api.match.search'),
    path('<int:match_id>/join/', views.match_join, name='api.match.join'),
    path('<int:match_id>/', views.match_detail, name='api.match.detail'),
    path('nlp/', nlp.query, name='api.nlp.query'),
]
