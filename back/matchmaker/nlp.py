'''
matchmaker nlp
'''
from google.cloud.language import LanguageServiceClient, enums, types
from google.protobuf.json_format import MessageToDict
from google.api_core.exceptions import InvalidArgument

from djangorestframework_camel_case.parser import CamelCaseJSONParser
from django.http import HttpResponseBadRequest, HttpResponseNotAllowed, JsonResponse


def query(request):
    '''Gets NLP API response'''
    if request.method == 'POST':
        try:
            data = CamelCaseJSONParser().parse(request)
            text = data['nlp_text']
        except KeyError:
            return HttpResponseBadRequest()

        response_empty = {}
        response_empty['categories'] = [{'name': ''}]
        response_empty['locations'] = [{'name': ''}]
        response_empty['events'] = [{'name': ''}]

        split_text = text.split()
        num_tokens = len(split_text)

        if num_tokens == 0:
            return JsonResponse(response_empty, status=200)
        if num_tokens < 20:
            text += (" " + text) * int(20 / num_tokens + 1)
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
            return JsonResponse(response_empty, status=200)

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
        return JsonResponse(response, status=200)
    return HttpResponseNotAllowed(['POST'])
