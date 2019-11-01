from django.shortcuts import render
from django.contrib import auth
from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from django.conf import settings    ##settings.AUTH_USER_MODEL

from userapp.models import User
from userapp.serializers import *

@csrf_exempt
def sign_up(request):
    if request.method == 'POST':
        data = JSONParser().parse(request)
        serializer = UserSerializer(data=data)
        if serializer.is_valid():
            email = serializer.data["email"]
            password = serializer.data["password"]
            username = serializer.data["username"]
            firstName = serializer.data["firstName"]
            lastName = serializer.data["lastName"]
            phoneNumber = serializer.data["phoneNumber"]
            gender = serializer.data["gender"]
            birthdate = serializer.data["birthdate"]
            message = serializer.data["message"]
            profilePicture = serializer.data["profilePicture"]
            emailPublic = serializer.data["emailPublic"]
            schedulePublic = serializer.data["schedulePublic"]
            interestPublic = serializer.data["interestPublic"]
            user = User.objects.create_user(
                email=email,
                password=password,
                username=username,
                firstName=firstName,
                lastName=lastName,
                phoneNumber=phoneNumber,
                gender=gender,
                birthdate=birthdate,
                message=message,
                profilePicture=profilePicture,
                emailPublic=emailPublic,
                schedulePublic=schedulePublic,
                interestPublic=interestPublic)
            auth.login(request, user)
            return JsonResponse(serializer.data)
        return JsonResponse(serializer.data,status=400)

@csrf_exempt
def sign_in(request):
    if request.method == 'POST':
        data = JSONParser().parse(request)
        user = auth.authenticate(email=data["email"], password=data["password"])
        if user is not None:
            auth.login(request,user)
            return HttpResponse(status=200)
        return HttpResponse(status=400)

@csrf_exempt
def sign_out(request):
    if request.method == 'POST':
        if request.user.is_authenticated:
            auth.logout(request)
            return HttpResponse(status=200)
        return HttpResponse(status=400)



@csrf_exempt
def user_detail(request, pk):
    try:
        user = User.objects.get(pk=pk)
    except User.DoesNotExist:
        return HttpResponse(status=404)

    if request.method == 'GET':
        serializer = UserSerializer(user)
        return JsonResponse(serializer.data)

    elif request.method == 'POST':
        data = JSONParser().parse(request)
        serializer = UserSerializer(user, data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data)
        return JsonResponse(serializer.errors, status=400)