'''
matchmaker views
Handle requests.
'''
import json
from django.http import HttpResponseBadRequest, \
    HttpResponseNotAllowed, JsonResponse
from django.views.decorators.csrf import ensure_csrf_cookie
from django.shortcuts import get_object_or_404
from django.contrib.auth import get_user_model
from django.forms.models import model_to_dict
import arrow
from djangorestframework_camel_case.parser import CamelCaseJSONParser
from djangorestframework_camel_case.render import CamelCaseJSONRenderer


from .models import Category, Match, Participation
from .serializers import MatchSerializer

USER = get_user_model()


def match_simple_serializer(match_object):
    '''Simple serializer'''
    return {
        'id': match_object.id,
        'title': match_object.title,
        'host': match_object.host_user.id,
        'time': match_object.time_begin,
        'location': match_object.location_text,
        'capacity': match_object.capacity,
        'numParticipants': match_object.participation_match.all().count(),
    }


def match(request):
    '''Makes and returns a new match.'''
    if request.method == 'POST':
        try:
            data = CamelCaseJSONParser().parse(request)
            category_id = data['category']
            time_begin = arrow.get(data['time_begin']).datetime
            time_end = arrow.get(data['time_end']).datetime
            data['time_begin'] = time_begin
            data['time_end'] = time_end
        except (KeyError, arrow.parser.ParserError):
            # 400
            return HttpResponseBadRequest()
        category = get_object_or_404(Category, pk=category_id)
        data['category'] = category
        data['host_user_id'] = request.user.id
        match_serializer = MatchSerializer(data=data)
        if match_serializer.is_valid():
            new_match_obj = match_serializer.create(data)
            participation = Participation(user=USER.objects.get(
                pk=request.user.id), match=new_match_obj, rating=0)
            participation.save()
            new_match_data = match_serializer.validated_data
            new_match_data.update(
                {"pk": new_match_obj.pk, 'num_participants': 1})
            response = json.loads(
                CamelCaseJSONRenderer().render(new_match_data))
            return JsonResponse(response, status=201)
        # 400
        return HttpResponseBadRequest()
    # 405
    return HttpResponseNotAllowed(['POST'])


@ensure_csrf_cookie
def match_new(request):
    '''Returns new three matches.'''
    if request.method == 'GET':
        raw_result = Match.objects.all().order_by('-created_on').values()[:3]
        result = list(map(match_simple_serializer, list(raw_result)))
        return JsonResponse(result, safe=False)
    return HttpResponseNotAllowed(['GET'])


def match_hot(request):
    '''Returns hot three matches.'''
    if request.method == 'GET':
        raw_result = Match.objects.all().order_by('-view_count').values()[:3]
        result = list(map(match_simple_serializer, list(raw_result)))
        return JsonResponse(result, safe=False)
    return HttpResponseNotAllowed(['GET'])


def match_recommend(request):
    '''Returns recommend three matches.'''
    if request.method == 'GET':
        raw_result = Match.objects.all().order_by('-view_count').values()[:3]
        result = list(map(match_simple_serializer, list(raw_result)))
        return JsonResponse(result, safe=False)
    return HttpResponseNotAllowed(['GET'])


def match_detail(request, match_id):
    '''Handles requests about a match'''
    if request.method == 'GET':
        match_obj = get_object_or_404(Match, pk=match_id)
        match_json = model_to_dict(match_obj)
        match_json.update(
            {'num_participants': match_obj.participation_match.all().count()})
        del match_json['match_thumbnail']
        match_json = json.loads(
            CamelCaseJSONRenderer().render(match_json))
        return JsonResponse(match_json, safe=False, status=200)
    if request.method == 'PUT':
        match_obj = get_object_or_404(Match, pk=match_id)
        # add author check below after implementing login
        # and putting author in the match model
        try:
            data = CamelCaseJSONParser().parse(request)
            category_id = data['category']
            time_begin = arrow.get(data['time_begin']).datetime
            time_end = arrow.get(data['time_end']).datetime
            data['time_begin'] = time_begin
            data['time_end'] = time_end
        except (KeyError, arrow.parser.ParserError):
            # 400
            return HttpResponseBadRequest()
        category = get_object_or_404(Category, pk=category_id)
        data[category_id] = category.id
        match_serializer = MatchSerializer(
            match_obj, data=data, partial=True)
        if match_serializer.is_valid():
            match_obj = match_serializer.save()
            match_data = match_serializer.validated_data
            match_data.update({"pk": match_obj.pk})
            response = json.loads(
                CamelCaseJSONRenderer().render(match_data))
            return JsonResponse(response, status=200)
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
