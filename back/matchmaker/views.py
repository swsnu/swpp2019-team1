"""
matchmaker views
Handle requests.
"""
import json
from json import JSONDecodeError
from datetime import datetime
from django.http import HttpResponse, HttpResponseBadRequest, HttpResponseNotAllowed, JsonResponse
from django.core import serializers
from django.utils import timezone
from django.views.decorators.csrf import ensure_csrf_cookie
#from userapp.models import User
from .models import Category, Match


def match_simple_serializer(matchObj):
    """Simple serializer"""
    return {
        'id': matchObj.id,
        'title': matchObj.title,
        'time': matchObj.timeBegin,
        'location': matchObj.locationText,
    }


def match(request):
    # pylint: disable=too-many-locals
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
        # TODO: error handle
        category = Category.objects.get(id=match_category_id)
        new_match = Match(title=match_title,
                          hostUserID=request.user,
                          # thumbnail=SOMETHING,
                          categoryID=category,
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


def search(request):
    """Returns search result."""
    if request.method == 'GET':
        query = request.GET['query']
        search_result_raw = [match for match in Match.objects.filter(
            title__contains=query)]
        search_result = list(map(match_simple_serializer, search_result_raw))
        return JsonResponse(search_result, safe=False)
    return HttpResponseNotAllowed(['GET'])
