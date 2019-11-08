''' custom user views '''
from django.contrib.auth import get_user_model
from django.contrib import auth
from django.http import HttpResponse, HttpResponseNotAllowed, HttpResponseNotFound, JsonResponse
from django.views.decorators.csrf import ensure_csrf_cookie

from djangorestframework_camel_case.parser import CamelCaseJSONParser

from userapp.serializers import UserSerializer

USER = get_user_model()


@ensure_csrf_cookie
def token(request):
    ''' get csrf token '''
    if request.method == 'GET':
        return HttpResponse(status=204)
    return HttpResponseNotAllowed(['GET'])


def get_user(request):
    ''' returns user public key '''
    if request.method == 'GET':
        if request.user.is_authenticated:
            return JsonResponse({'id': request.user.id}, status=200)
        return JsonResponse({'id': 0}, status=200)
    return HttpResponseNotAllowed(['GET'])


def sign_up(request):
    ''' sign up '''
    if request.method == 'POST':
        data = CamelCaseJSONParser().parse(request)
        serializer = UserSerializer(data=data)
        if serializer.is_valid():
            user = serializer.create(data)
            auth.login(request, user)
            # 200
            return JsonResponse(serializer.data, status=201)
        # 400
        return JsonResponse(serializer.data, status=400)
    # 405
    return HttpResponseNotAllowed(['POST'])


def sign_in(request):
    ''' sign in '''
    if request.method == 'POST':
        data = CamelCaseJSONParser().parse(request)
        user = auth.authenticate(
            email=data['email'], password=data['password'])
        if user is not None:
            auth.login(request, user)
            return JsonResponse({'id': user.pk}, status=200)
        return HttpResponse(status=400)
    # 405
    return HttpResponseNotAllowed(['POST'])


def sign_out(request):
    ''' sign out '''
    if request.method == 'POST':
        if request.user.is_authenticated:
            auth.logout(request)
            return HttpResponse(status=204)
        return HttpResponse(status=401)
    # 405
    return HttpResponseNotAllowed(['POST'])


def user_detail(request, user_id):
    ''' user detail '''
    try:
        user = USER.objects.get(pk=user_id)
    except USER.DoesNotExist:
        # 404
        return HttpResponseNotFound()

    if request.method == 'GET':
        serializer = UserSerializer(user)
        return JsonResponse(serializer.data)

    if request.method == 'PATCH':
        data = CamelCaseJSONParser().parse(request)
        serializer = UserSerializer(user, data=data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data)
        return JsonResponse(serializer.errors, status=400)

    # 405
    return HttpResponseNotAllowed(['GET', 'PATCH'])
