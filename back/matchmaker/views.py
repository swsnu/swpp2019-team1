'''
matchmaker views
Handle requests.
'''
import json
from django.http import HttpResponse, HttpResponseBadRequest, \
    HttpResponseNotAllowed, JsonResponse
from django.shortcuts import get_object_or_404
from django.contrib.auth import get_user_model
import arrow
from djangorestframework_camel_case.parser import CamelCaseJSONParser
from djangorestframework_camel_case.util import underscoreize
from djangorestframework_camel_case.render import CamelCaseJSONRenderer


from .models import Category, Match, Participation
from .serializers import MatchSerializer, ParticipationSerializer

USER = get_user_model()


def match_simple_serializer(match_object):
    '''Simple serializer'''
    return {
        'id': match_object.id,
        'title': match_object.title,
        'host': match_object.host_user.username,
        'time': match_object.time_begin,
        'location': match_object.location_text,
        'capacity': match_object.capacity,
        'numParticipants': match_object.participation_match.all().count(),
    }


def match(request):
    '''Makes and returns a new match.'''
    if request.method == 'POST':
        if request.user.is_authenticated:
            try:
                data = underscoreize(request.POST)
                print(request.FILES)
                if 'matchThumbnail' in request.FILES:
                    data['match_thumbnail'] = request.FILES['matchThumbnail']
                category_idx = data['category']
                print(data)
                print(dict(data))
                print(data.dict())
                time_begin = arrow.get(data['time_begin']).datetime
                time_end = arrow.get(data['time_end']).datetime
                data['time_begin'] = time_begin
                data['time_end'] = time_end
            except (KeyError, arrow.parser.ParserError):
                return HttpResponseBadRequest()

            print(category_idx)
            category = get_object_or_404(Category, indexes=category_idx)
            data['category'] = category
            data['host_user_id'] = request.user.id
            data = data.dict()
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
            # 400
            return HttpResponseBadRequest()
        return HttpResponse(status=401)  # not authenticated
    # 405
    return HttpResponseNotAllowed(['POST'])


def match_new(request):
    '''Returns new three matches.'''
    if request.method == 'GET':
        raw_result = Match.objects.all().order_by('-created_on')[:3]
        result = list(map(match_simple_serializer, list(raw_result)))
        return JsonResponse(result, safe=False)
    return HttpResponseNotAllowed(['GET'])


def match_hot(request):
    '''Returns hot three matches.'''
    if request.method == 'GET':
        raw_result = Match.objects.all().order_by('-view_count')[:3]
        result = list(map(match_simple_serializer, list(raw_result)))
        return JsonResponse(result, safe=False)
    return HttpResponseNotAllowed(['GET'])


def match_recommend(request):
    '''Returns recommend three matches.'''
    if request.method == 'GET':
        raw_result = Match.objects.all().order_by('-view_count')[:3]
        result = list(map(match_simple_serializer, list(raw_result)))
        return JsonResponse(result, safe=False)
    return HttpResponseNotAllowed(['GET'])


def match_detail(request, match_id):
    '''Handles requests about a match'''
    if request.method == 'GET':
        match_obj = get_object_or_404(Match, pk=match_id)
        if request.session.get('match%d' % match_id, 0) == 0:
            match_obj.view_count = match_obj.view_count+1
            serializer = MatchSerializer(match_obj, data=match_obj)
            match_obj.save()
            request.session['match%d' % match_id] = 1
        serializer = MatchSerializer(match_obj)
        match_json = serializer.data
        match_json.update(
            {'hostUser': {'id': match_obj.host_user.id, 'username': match_obj.host_user.username}})
        match_json.update(
            {'num_participants': match_obj.participation_match.all().count(),
             'host_name': match_obj.host_user.username})
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
            category_idx = data['category']
            time_begin = arrow.get(data['time_begin']).datetime
            time_end = arrow.get(data['time_end']).datetime
            data['time_begin'] = time_begin
            data['time_end'] = time_end
        except (KeyError, arrow.parser.ParserError):
            # 400
            return HttpResponseBadRequest()
        category = get_object_or_404(Category, indexes=category_idx)
        data['category'] = category
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
        query = request.GET['query']
        search_result_raw = list(Match.objects.filter(title__contains=query))
        search_result = list(map(match_simple_serializer, search_result_raw))
        return JsonResponse(search_result, safe=False)
    return HttpResponseNotAllowed(['GET'])
