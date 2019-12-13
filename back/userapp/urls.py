''' userapp url '''
from django.urls import path
from . import views

urlpatterns = [
    path('<int:user_id>/', views.user_detail),
    path('<int:user_id>/interest/', views.user_interest),
    path('signin/', views.sign_in),
    path('signout/', views.sign_out),
    path('signup/', views.sign_up),
]
