''' custom user views '''
import json

from django.contrib.auth import get_user_model
from django.contrib import auth
from django.http import HttpResponse, HttpResponseNotAllowed, HttpResponseNotFound, JsonResponse
from django.views.decorators.csrf import ensure_csrf_cookie, csrf_exempt

from djangorestframework_camel_case.parser import CamelCaseJSONParser
from djangorestframework_camel_case.render import CamelCaseJSONRenderer

from userapp.serializers import UserSerializer

from matchmaker.models import Match, Participation
from matchmaker.serializers import MatchSerializer

USER = get_user_model()

@ensure_csrf_cookie
def token(request):
    ''' get csrf token '''
    if request.method == 'GET':
        return HttpResponse(status=204)
    return HttpResponseNotAllowed(['GET'])

# @csrf_exempt
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

@csrf_exempt
@ensure_csrf_cookie
def sign_in(request):
    ''' sign in '''
    if request.method == 'POST':
        data = CamelCaseJSONParser().parse(request)
        user = auth.authenticate(
            email=data['email'], password=data['password'])
        if user is not None:
            auth.login(request, user)
            serializer = UserSerializer(user)
            return JsonResponse({'user': serializer.data}, status=200)
        return HttpResponse(status=400)
    # 405
    return HttpResponseNotAllowed(['POST'])

@csrf_exempt
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
        data = serializer.data
        del data['password']
        data['fullName'] = user.get_full_name()
        participation_list = Participation.objects.values().filter(user_id=user_id)
        match_list = []
        for participation in participation_list:
            match = Match.objects.get(id=participation['match_id'])
            match_json = MatchSerializer(match).data
            match_list.append(match_json)
        data['schedule'] = match_list
        response = json.loads(
            CamelCaseJSONRenderer().render(data))
        return JsonResponse(response)

    if request.method == 'PATCH':
        data = CamelCaseJSONParser().parse(request)
        serializer = UserSerializer(user, data=data, partial=True)
        if serializer.is_valid():
            serializer.save()
            response = json.loads(
                CamelCaseJSONRenderer().render(serializer.data))
            return JsonResponse(response)
        return JsonResponse(serializer.errors, status=400)

    # 405
    return HttpResponseNotAllowed(['GET', 'PATCH'])
