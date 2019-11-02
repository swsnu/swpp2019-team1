"""
matchmaker views
Handle requests.
"""
from json import JSONDecodeError
from django.http import HttpResponse, HttpResponseBadRequest, \
    HttpResponseNotAllowed, HttpResponseNotFound, JsonResponse
from django.views.decorators.csrf import ensure_csrf_cookie
from djangorestframework_camel_case.parser import CamelCaseJSONParser
import arrow
#from userapp.models import User
from .models import Category, Match
from .serializers import MatchSerializer


def match_simple_serializer(match_object):
    """Simple serializer"""
    return {
        'id': match_object.id,
        'title': match_object.title,
        'time': match_object.time_begin,
        'location': match_object.location_text,
    }


def match(request):
    # pylint: disable=too-many-locals
    """Makes and returns a new match."""
    if request.method == 'POST':
        try:
            data = CamelCaseJSONParser().parse(request)
            '''
            capacity = data['capacity']
            location_text = data['location_text']
            period = data['period']
            additional_info = data['additional_info']
            is_age_restricted = data['is_age_restricted']
            restrict_age_from = data['restrict_age_from']
            restrict_age_to = data['restrict_age_to']
            is_gender_restricted = data['is_gender_restricted']
            restricted_gender = data['restricted_gender']
            '''
            category_id = data['category_id']
            time_begin = arrow.get(data['time_begin']).datetime
            time_end = arrow.get(data['time_end']).datetime
            data['time_begin'] = time_begin
            data['time_end'] = time_end
        except (KeyError, arrow.parser.ParserError):
            # 400
            return HttpResponseBadRequest()
        try:
            Category.objects.get(id=category_id)
        except Category.DoesNotExist:
            # 404
            return HttpResponseNotFound()
        data['host_user_id'] = request.user.id
        match_serializer = MatchSerializer(data=data)
        if match_serializer.is_valid():
            match_serializer.create(data)
            return JsonResponse(match_serializer.data, status=201)
        # 400
        return HttpResponseBadRequest()
    # 405
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
        search_result_raw = list(Match.objects.filter(title__contains=query))
        search_result = list(map(match_simple_serializer, search_result_raw))
        return JsonResponse(search_result, safe=False)
    return HttpResponseNotAllowed(['GET'])
