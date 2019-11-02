''' custom user views '''
# from django.shortcuts import render
from django.contrib import auth
# HttpResponseForbidden, HttpResponseNotFound, HttpResponseBadRequest,
from django.http import HttpResponse, HttpResponseNotAllowed, JsonResponse
from django.views.decorators.csrf import csrf_exempt
# from django.conf import settings  # settings.AUTH_USER_MODEL
from djangorestframework_camel_case.parser import CamelCaseJSONParser

from userapp.models import User
from userapp.serializers import UserSerializer


@csrf_exempt
def sign_up(request):
    # pylint: disable=too-many-locals
    ''' sign up '''
    if request.method == 'POST':
        data = CamelCaseJSONParser().parse(request)
        serializer = UserSerializer(data=data)
        if serializer.is_valid():
            email = serializer.data["email"]
            password = serializer.data["password"]
            username = serializer.data["username"]
            first_name = serializer.data["first_name"]
            last_name = serializer.data["last_name"]
            phone_number = serializer.data["phone_number"]
            gender = serializer.data["gender"]
            birthdate = serializer.data["birthdate"]
            message = serializer.data["message"]
            profile_picture = serializer.data["profile_picture"]
            is_email_public = serializer.data["is_email_public"]
            is_schedule_public = serializer.data["is_schedule_public"]
            is_interest_public = serializer.data["is_interest_public"]
            user = User.objects.create_user(
                email=email,
                password=password,
                username=username,
                first_name=first_name,
                last_name=last_name,
                phone_number=phone_number,
                gender=gender,
                birthdate=birthdate,
                message=message,
                profile_picture=profile_picture,
                is_email_public=is_email_public,
                is_schedule_public=is_schedule_public,
                is_interest_public=is_interest_public)
            auth.login(request, user)
            # 200
            return JsonResponse(serializer.data)
        # 400
        return JsonResponse(serializer.data, status=400)
    # 405
    return HttpResponseNotAllowed(['POST'])


@csrf_exempt
def sign_in(request):
    ''' sign in '''
    if request.method == 'POST':
        data = CamelCaseJSONParser().parse(request)
        user = auth.authenticate(
            email=data["email"], password=data["password"])
        if user is not None:
            auth.login(request, user)
            return HttpResponse(status=200)
        return HttpResponse(status=400)
    # 405
    return HttpResponseNotAllowed(['POST'])


@csrf_exempt
def sign_out(request):
    ''' sign out '''
    if request.method == 'POST':
        if request.user.is_authenticated:
            auth.logout(request)
            return HttpResponse(status=200)
        return HttpResponse(status=400)
    # 405
    return HttpResponseNotAllowed(['POST'])


@csrf_exempt
def user_detail(request, user_id):
    ''' user detail '''
    try:
        user = User.objects.get(pk=user_id)
    except User.DoesNotExist:
        return HttpResponse(status=404)

    if request.method == 'GET':
        serializer = UserSerializer(user)
        return JsonResponse(serializer.data)

    if request.method == 'POST':
        data = CamelCaseJSONParser().parse(request)
        serializer = UserSerializer(user, data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data)
        return JsonResponse(serializer.errors, status=400)

    # 405
    return HttpResponseNotAllowed(['GET', 'POST'])
