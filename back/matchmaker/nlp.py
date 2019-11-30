'''
matchmaker nlp
'''
from google.cloud.language import LanguageServiceClient, enums, types
from google.protobuf.json_format import MessageToDict
from google.api_core.exceptions import InvalidArgument

from djangorestframework_camel_case.parser import CamelCaseJSONParser
from django.http import HttpResponseBadRequest, HttpResponseNotAllowed, JsonResponse

RESPONSE_EMPTY = {}
RESPONSE_EMPTY['categories'] = [{'name': ''}]
RESPONSE_EMPTY['locations'] = [{'name': ''}]
RESPONSE_EMPTY['events'] = [{'name': ''}]

def check_text(text):
    '''Check text.'''
    split_text = text.split()
    num_tokens = len(split_text)
    if num_tokens == 0:
        return None
    if num_tokens < 20:
        text += (" " + text) * int(20 / num_tokens + 1)
    return text

def make_response(response, analysis_response):
    '''Make response'''
    locations = []
    events = []
    for entity in analysis_response['entities']:
        if entity['type'] == 'LOCATION':
            locations.append(entity)
        elif entity['type'] == 'EVENT':
            events.append(entity)
    if 'categories' not in response:
        response['categories'] = [{'name': ''}]
    if len(locations) == 0:
        locations.append({'name': ''})
    if len(events) == 0:
        events.append({'name': ''})
    response['locations'] = locations
    response['events'] = events

    return response

def query(request):
    '''Gets NLP API response'''
    if request.method == 'POST':
        try:
            data = CamelCaseJSONParser().parse(request)
            text = data['nlp_text']
        except KeyError:
            return HttpResponseBadRequest()

        text = check_text(text)

        if text is None:
            return JsonResponse(RESPONSE_EMPTY, status=200)

        client = LanguageServiceClient()

        # pylint: disable=no-member
        document = types.Document(
            content=text,
            type=enums.Document.Type.PLAIN_TEXT)
        # pylint: enable=no-member

        try:
            google_category_response = client.classify_text(document=document)
            google_analysis_response = client.analyze_entities(document=document)
            response = MessageToDict(google_category_response)
            analysis_response = MessageToDict(google_analysis_response)
        except InvalidArgument:
            return JsonResponse(RESPONSE_EMPTY, status=200)

        response = make_response(response, analysis_response)

        return JsonResponse(response, status=200)
    return HttpResponseNotAllowed(['POST'])
