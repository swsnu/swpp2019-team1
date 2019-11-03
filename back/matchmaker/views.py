'''
matchmaker views
Handle requests.
'''
from django.http import HttpResponse, HttpResponseBadRequest, \
    HttpResponseNotAllowed, HttpResponseNotFound, JsonResponse
from django.views.decorators.csrf import ensure_csrf_cookie
from django.core import serializers
from django.shortcuts import get_object_or_404
import arrow
from djangorestframework_camel_case.parser import CamelCaseJSONParser

from .models import Category, Match
from .serializers import MatchSerializer


def match_simple_serializer(match_object):
    '''Simple serializer'''
    return {
        'id': match_object.id,
        'title': match_object.title,
        'time': match_object.time_begin,
        'location': match_object.location_text,
    }


def match(request):
    '''Makes and returns a new match.'''
    if request.method == 'POST':
        try:
            print(request.body)
            data = CamelCaseJSONParser().parse(request)
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
        print(match_serializer.initial_data)
        if match_serializer.is_valid():
            match_serializer.create(data)
            return JsonResponse(match_serializer.data, status=201)
        # 400
        return HttpResponseBadRequest()
    # 405
    return HttpResponseNotAllowed(['POST'])


@ensure_csrf_cookie
def match_new(request):
    '''Returns new three matches.'''
    if request.method == 'GET':
        # not yet implemented
        return HttpResponse(status=200)
    return HttpResponseNotAllowed(['GET'])


def match_detail(request, match_id):
    '''Handles requests about a match'''
    if request.method == 'GET':
        match_obj = get_object_or_404(Match, pk=match_id)
        match_json = serializers.serialize('json', [match_obj])
        return JsonResponse(match_json, safe=False, status=200)
    if request.method == 'PUT':
        match_obj = get_object_or_404(Match, pk=match_id)
        # add author check below after implementing login
        # and putting author in the match model
        try:
            data = CamelCaseJSONParser().parse(request)
            category_id = data['category_id']
            time_begin = arrow.get(data['time_begin']).datetime
            time_end = arrow.get(data['time_end']).datetime
            data['time_begin'] = time_begin
            data['time_end'] = time_end
        except (KeyError, arrow.parser.ParserError):
            # 400
            return HttpResponseBadRequest()
        category = get_object_or_404(Category, pk=category_id)
        data[category_id] = category.id
        match_serializer = MatchSerializer(match_obj, data=data, partial=True)
        if match_serializer.is_valid():
            match_serializer.save()
            return JsonResponse(match_serializer.data, status=200)
        # 400
        return HttpResponseBadRequest()
    return HttpResponseNotAllowed(['GET', 'PUT', 'PATCH', 'DELETE'])


def search(request):
    '''Returns search result.'''
    if request.method == 'GET':
        query = request.GET['query']
        search_result_raw = list(Match.objects.filter(title__contains=query))
        search_result = list(map(match_simple_serializer, search_result_raw))
        return JsonResponse(search_result, safe=False)
    return HttpResponseNotAllowed(['GET'])
