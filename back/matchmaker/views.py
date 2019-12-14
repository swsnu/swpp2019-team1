'''
matchmaker views
Handle requests.
'''
import json
from django.http import HttpResponse, HttpResponseBadRequest, \
    HttpResponseNotAllowed, HttpResponseForbidden, JsonResponse
from django.shortcuts import get_object_or_404
from django.contrib.auth import get_user_model
import arrow
from djangorestframework_camel_case.util import underscoreize
from djangorestframework_camel_case.render import CamelCaseJSONRenderer

from .models import Category, Match, Participation
from .serializers import MatchSerializer, ParticipationSerializer

USER = get_user_model()


def get_match_detail_json(request, match_id):
    '''Simple serializer'''
    match_obj = get_object_or_404(Match, pk=match_id)
    if request.session.get('match%d' % match_id, 0) == 0:
        match_obj.view_count = match_obj.view_count+1
        match_obj.save()
        request.session['match%d' % match_id] = 1
    serializer = MatchSerializer(match_obj)
    match_json = serializer.data
    match_json.update(
        {'hostUser': {'id': match_obj.host_user.id, 'username': match_obj.host_user.username}})
    match_json.update(
        {'num_participants': match_obj.participation_match.all().count(),
         'host_name': match_obj.host_user.username})
    match_json = json.loads(
        CamelCaseJSONRenderer().render(match_json))
    return match_json


def process_post_request(request):
    '''Process POST requests with match information'''
    try:
        data = underscoreize(request.POST)
        category_idx = data['category']
        time_begin = arrow.get(data['time_begin']).datetime
        time_end = arrow.get(data['time_end']).datetime
        data['time_begin'] = time_begin
        data['time_end'] = time_end
    except (KeyError, arrow.parser.ParserError):
        return HttpResponseBadRequest()
    try:
        data['match_thumbnail'] = request.FILES['matchThumbnail']
    except KeyError:
        pass
    category = get_object_or_404(Category, indexes=category_idx)
    data['category'] = category
    data['host_user_id'] = request.user.id
    data = data.dict()
    return data


def match(request):
    '''Makes and returns a new match.'''
    if request.method == 'POST':
        data = process_post_request(request)
        match_serializer = MatchSerializer(data=data)
        if match_serializer.is_valid():
            new_match_obj = match_serializer.create(data)
            participation = Participation(user=USER.objects.get(
                pk=request.user.id), match=new_match_obj)
            participation.save()
            new_match_data = match_serializer.validated_data
            new_match_data.update(
                {"id": new_match_obj.pk, 'num_participants': 1})
            response = json.loads(
                CamelCaseJSONRenderer().render(new_match_data))
            return JsonResponse(response, status=201)
        # print(match_serializer.errors) need to return error info
        return HttpResponseBadRequest()
    return HttpResponseNotAllowed(['POST'])


def match_new(request):
    '''Returns new three matches.'''
    if request.method == 'GET':
        raw_result = Match.objects.all().order_by(
            '-created_on')[:3].values_list('id')
        match_id_list = [match_id_tuple[0] for match_id_tuple in raw_result]
        result = list(
            map((lambda id: get_match_detail_json(request, id)), list(match_id_list)))
        return JsonResponse(result, safe=False)
    return HttpResponseNotAllowed(['GET'])


def match_hot(request):
    '''Returns hot three matches.'''
    if request.method == 'GET':
        raw_result = Match.objects.all().order_by(
            '-view_count')[:3].values_list('id')
        match_id_list = [match_id_tuple[0] for match_id_tuple in raw_result]
        result = list(
            map((lambda id: get_match_detail_json(request, id)), list(match_id_list)))
        return JsonResponse(result, safe=False)
    return HttpResponseNotAllowed(['GET'])


def match_recommend(request):
    '''Returns recommend three matches.'''
    if request.method == 'GET':
        if request.user.is_authenticated:
            interest_list = USER.objects.get(
                id=request.user.id).interest_user.values()
            match_id_list = []
            for interest in interest_list:
                raw_result = Match.objects.filter(
                    category_id=interest['category_id']).exclude(
                        host_user_id=request.user.id).order_by(
                            '-view_count')[:1].values_list('id')
                if len(raw_result) > 0:
                    match_id_list.append(raw_result[0][0])
            result = list(
                map((lambda id: get_match_detail_json(request, id)), list(match_id_list)))
            return JsonResponse(result, safe=False)
        return HttpResponse(status=401)  # not authenticated
    return HttpResponseNotAllowed(['GET'])


def match_detail(request, match_id):
    '''Handles requests about a match'''
    if request.method == 'GET':
        match_json = get_match_detail_json(request, match_id)
        return JsonResponse(match_json, safe=False, status=200)

    if request.method == 'POST':
        match_obj = get_object_or_404(Match, pk=match_id)
        if match_obj.host_user != request.user:
            return HttpResponseForbidden()
        data = process_post_request(request)
        match_serializer = MatchSerializer(data=data)
        if match_serializer.is_valid():
            match_serializer.update(match_obj, data)
            match_data = match_serializer.validated_data
            match_data.update({"id": match_obj.pk,
                               'num_participants': match_obj.participation_match.all().count()})
            response = json.loads(
                CamelCaseJSONRenderer().render(match_data))
            return JsonResponse(response, status=200)
        return HttpResponseBadRequest()
    return HttpResponseNotAllowed(['GET', 'POST', 'PATCH', 'DELETE'])


def match_join(request, match_id):
    ''' Join match '''
    if request.method == 'POST':
        match_obj = get_object_or_404(Match, pk=match_id)
        if request.user.is_authenticated:
            data = {'user_id': request.user.id, 'match_id': match_obj.id}
            serializer = ParticipationSerializer(data=data)
            serializer.is_valid()  # always valid
            serializer.create(data)
            response = json.loads(
                CamelCaseJSONRenderer().render(serializer.data))
            return JsonResponse(response, status=200)
        return HttpResponse(status=401)  # not authenticated
    return HttpResponseNotAllowed(['POST'])


def search(request):
    '''Returns search result.'''
    if request.method == 'GET':
        query = ''
        category = ''
        if 'query' in request.GET:
            query = request.GET['query']
        if 'category' in request.GET:
            category = request.GET['category']
        search_result_raw = Match.objects.filter(
            title__contains=query).filter(category__indexes__startswith=category).values_list('id')
        match_id_list = [match_id_tuple[0]
                         for match_id_tuple in search_result_raw]
        search_result = list(
            map((lambda id: get_match_detail_json(request, id)), list(match_id_list)))
        return JsonResponse(search_result, safe=False)
    return HttpResponseNotAllowed(['GET'])
