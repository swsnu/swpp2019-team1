"""
Handle requests.
"""
import json
from json import JSONDecodeError
from datetime import datetime
# from django.contrib.auth import authenticate
from django.views.decorators.csrf import ensure_csrf_cookie
from django.http import HttpResponse, HttpResponseBadRequest, HttpResponseNotAllowed, JsonResponse
from django.core import serializers
from django.utils import timezone
from .models import Match

# uncomment after implementing login
# def check_authenticated(func):
#     def wrapper(request):
#         if request.user.is_authenticated:
#             return func(request)
#         else:
#             return HttpResponse(status=401)
#     return wrapper

# pylint: disable-msg=too-many-locals

# uncomment after implementing login
# @check_authenticated


def match(request):
    """Makes and returns a new match."""
    if request.method == 'POST':
        try:
            body = request.body.decode()
            match_title = json.loads(body)['title']
            match_category_id = json.loads(body)['categoryID']
            match_capacity = json.loads(body)['capacity']
            match_location_text = json.loads(body)['locationText']
            match_period = json.loads(body)['period']
            match_additional_info = json.loads(body)['additionalInfo']
            match_is_age_restricted = json.loads(body)['isAgeRestricted']
            match_restrict_age_from = json.loads(body)['restrictAgeFrom']
            match_restrict_age_to = json.loads(body)['restrictAgeTo']
            match_is_gender_restricted = json.loads(body)['isGenderRestricted']
            match_restricted_gender = json.loads(body)['restrictedGender']
            match_time_begin = json.loads(body)['timeBegin']
            match_time_end = json.loads(body)['timeEnd']
        except (KeyError, JSONDecodeError):
            return HttpResponseBadRequest()
        new_match = Match(title=match_title,
                          # host=request.user, need to be changed
                          # according to our implementation of user
                          # thumbnail=SOMETHING,
                          categoryID=match_category_id,
                          capacity=match_capacity,
                          isFull=(match_capacity == 1),
                          locationText=match_location_text,
                          period=match_period,
                          additionalInfo=match_additional_info,
                          isAgeRestricted=match_is_age_restricted,
                          restrictAgeFrom=match_restrict_age_from,
                          restrictAgeTo=match_restrict_age_to,
                          isGenderRestricted=match_is_gender_restricted,
                          restrictedGender=match_restricted_gender,
                          # get time info in UTC
                          timeBegin=datetime(
                              *match_time_begin, tzinfo=timezone.utc),
                          timeEnd=datetime(*match_time_end, tzinfo=timezone.utc))
        new_match.save()
        new_match_json = serializers.serialize('json', [new_match])
        return JsonResponse(new_match_json, safe=False, status=201)
    return HttpResponseNotAllowed(['POST'])
# pylint: enable-msg=too-many-locals


@ensure_csrf_cookie
def match_new(request):
    """Returns new three matches."""
    if request.method == 'GET':
        # not yet implemented
        return HttpResponse(status=200)
    return HttpResponseNotAllowed(['GET'])
