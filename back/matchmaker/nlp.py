'''
matchmaker nlp
'''
from google.cloud.language import LanguageServiceClient, enums, types
from google.protobuf.json_format import MessageToDict

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

        client = LanguageServiceClient()

        # pylint: disable=no-member
        document = types.Document(
            content=text,
            type=enums.Document.Type.PLAIN_TEXT)
        # pylint: enable=no-member

        google_category_response = client.classify_text(document=document)
        google_analysis_response = client.analyze_entities(document=document)
        response = MessageToDict(google_category_response)
        analysis_response = MessageToDict(google_analysis_response)

        locations = []
        events = []
        for entity in analysis_response['entities']:
            if entity['type'] == 'LOCATION':
                locations.append(entity)
            elif entity['type'] == 'EVENT':
                events.append(entity)
        if 'categories' not in response:
            response['categories'] = ['']
        if len(locations) == 0:
            locations.append('')
        if len(events) == 0:
            events.append('')
        response['text'] = text
        response['locations'] = locations
        response['events'] = events
        return JsonResponse(response, status=200)
    return HttpResponseNotAllowed(['POST'])
