'''
matchmaker tests
'''
import json
import tempfile
from unittest import mock
from unittest.mock import patch
from django.test import TestCase, Client
from django.test.client import encode_multipart
from django.conf import settings
from django.forms.models import model_to_dict

import arrow
from PIL import Image
from google.cloud.language_v1.proto import language_service_pb2
from google.api_core.exceptions import InvalidArgument

from userapp.tests import create_dummy_user
from matchmaker.models import Match, Category
from matchmaker.serializers import MatchSerializer
from matchmaker import nlp

BOUNDARY = 'BoUnDaRyStRiNg'
MULTIPART_CONTENT = 'multipart/form-data; boundary=%s' % BOUNDARY


def create_dummy_category():
    '''create dummy category'''
    return Category.objects.create(name='TEST_NAME', indexes=[0])


def create_dummy_match(test_user, test_category):
    '''create dummy match'''
    return Match.objects.create(
        title='TEST_TITLE', category=test_category, host_user=test_user,
        capacity=4, location_text='TEST_LOCATION')
# pylint: disable=too-few-public-methods, no-self-use, unused-argument, invalid-name
class GoogleCloudLanguageMock:
    '''GoogleCloudLanguageMock'''
    class LanguageServiceClient:
        '''LanguageServiceClient'''
        # google_category_response = client.classify_text(document=document)
        def classify_text(self, document=None):
            '''classify_text'''
            category = language_service_pb2.ClassificationCategory(
                name='/Internet & Telecom/Mobile & Wireless',
                confidence=0.6100000143051147)
            response = language_service_pb2.ClassifyTextResponse(categories=[category])
            return response

        # google_analysis_response = client.analyze_entities(document=document)
        def analyze_entities(self, document=None):
            '''analyze_entities'''
            entity_location = language_service_pb2.Entity(name="Amphitheatre Pkwy", type=2)
            entity_event = language_service_pb2.Entity(name="Consumer Electronic Show", type=4)
            entity_address = language_service_pb2.Entity(
                name="Mountain View (1600 Amphitheatre Pkwy", type=10)
            response = language_service_pb2.AnalyzeEntitiesResponse(
                entities=[entity_location, entity_event, entity_address])
            return response

    class LanguageServiceClientEmpty:
        '''LanguageServiceClient'''
        # google_category_response = client.classify_text(document=document)
        def classify_text(self, document=None):
            '''classify_text'''
            return language_service_pb2.ClassifyTextResponse()

        # google_analysis_response = client.analyze_entities(document=document)
        def analyze_entities(self, document=None):
            '''analyze_entities'''
            entity_anything_else = language_service_pb2.Entity(name="Anything Else", type=3)
            return language_service_pb2.AnalyzeEntitiesResponse(entities=[entity_anything_else])

    class LanguageServiceClientInvalid:
        '''LanguageServiceClient'''
        # google_category_response = client.classify_text(document=document)
        def classify_text(self, document=None):
            '''classify_text'''
            raise InvalidArgument('Invalid text content: too few tokens (words) to process.')

    '''
    document = types.Document(
        content=text,
        type=enums.Document.Type.PLAIN_TEXT)
    '''
    class types:
        '''types'''
        class Document:
            '''Document'''

    # enums.Document.Type.PLAIN_TEXT
    class enums:
        '''enums'''
        class Document:
            '''Document'''
            class Type:
                '''Type'''
                PLAIN_TEXT = ''
# pylint: enable=too-few-public-methods, no-self-use, unused-argument, invalid-name

class MatchMakerTestCase(TestCase):
    '''Tests for the app Matchmaker'''

    def setUp(self):
        # Setup test database here TODO
        pass

    def test_matchserializer(self):
        '''test match serializer'''
        client = Client(enforce_csrf_checks=True)
        response = client.get('/api/token/')
        csrftoken = response.cookies['csrftoken'].value
        test_user = create_dummy_user('TEST_EMAIL@test.com')
        client.login(email='TEST_EMAIL@test.com', password='TEST_PASSWORD')
        test_category = create_dummy_category()
        test_match = create_dummy_match(test_user, test_category)

        with tempfile.NamedTemporaryFile(suffix='.jpg') as temp_file:
            test_image = Image.new('RGB', (100, 100))
            test_image.save(temp_file)
            temp_file.seek(0)
            form = encode_multipart(BOUNDARY, {
                'matchThumbnail': temp_file,
                'title': 'TEST_TITLE',
                'category': '0',
                'capacity': 5,
                'locationText': 'TEST_LOCATION_TEXT',
                'period': 3,
                'additionalInfo': 'TEST_ADDITIONAL_INFO',
                'isAgeRestricted': True,
                'restrictAgeFrom': 4,
                'restrictAgeTo': 7,
                'isGenderRestricted': True,
                'restrictedGender': settings.MALE,
                'timeBegin': '2019-11-03T08:07:46+09:00',
                'timeEnd': '2019-11-03T08:07:46+09:00',
            })
            response = client.post('/api/match/',
                                   data=form,
                                   content_type=MULTIPART_CONTENT,
                                   HTTP_X_CSRFTOKEN=csrftoken)
            self.assertEqual(response.status_code, 201)

            serializer = MatchSerializer(response.json(), data=response.json())
            self.assertEqual(serializer.is_valid(), True)
            self.assertEqual(serializer.data['num_participants'], 1)

            test_match_dict = model_to_dict(test_match)
            test_match_dict['category'] = test_category
            test_match_dict['host_user_id'] = test_user.id
            del test_match_dict['host_user']
            del test_match_dict['match_thumbnail']

            test_match_dict = {'id': 7, 'title': 'TEST_TITLE', 'category': test_category,
                               'capacity': 4, 'location_text': 'TEST_LOCATION_TEXT',
                               'period': 3, 'additional_info': 'TEST_ADDITIONAL_INFO',
                               'is_age_restricted': True, 'restrict_age_from': 4,
                               'restrict_age_to': 7, 'is_gender_restricted': True,
                               'restricted_gender': True,
                               'time_begin': arrow.get('2019-11-03T08:07:46+09:00').datetime,
                               'time_end': arrow.get('2019-11-03T08:07:46+09:00').datetime,
                               'host_user_id': test_user.id}
            serializer = MatchSerializer(test_match_dict, data=test_match_dict)

            self.assertEqual(serializer.is_valid(), True)
            self.assertEqual(serializer.data['num_participants'], 0)

    def test_category(self):
        '''test category'''
        dummy_category = create_dummy_category()
        self.assertEqual(dummy_category.__str__(), 'TEST_NAME')

    def test_http_response_404(self):
        '''Checks if the views module handles bad requests correctly.'''
        with tempfile.NamedTemporaryFile() as temp_file:
            client = Client(enforce_csrf_checks=True)
            response = client.get('/api/token/')
            csrftoken = response.cookies['csrftoken'].value
            create_dummy_user('TEST_EMAIL@test.com')
            client.login(email='TEST_EMAIL@test.com', password='TEST_PASSWORD')
            # starts here
            form = encode_multipart(BOUNDARY, {
                "matchThumbnail": temp_file,
                'title': 'TEST_TITLE',
                'category': 9999,
                'capacity': 4,
                'locationText': 'TEST_LOCATION_TEXT',
                'period': 3,
                'additionalInfo': 'TEST_ADDITIONAL_INFO',
                'isAgeRestricted': True,
                'restrictAgeFrom': 4,
                'restrictAgeTo': 7,
                'isGenderRestricted': True,
                'restrictedGender': settings.MALE,
                'timeBegin': '2019-11-03T08:07:46+09:00',
                'timeEnd': '2019-11-03T08:07:46+09:00',
            })
            response = client.post('/api/match/',
                                   data=form,
                                   content_type=MULTIPART_CONTENT,
                                   HTTP_X_CSRFTOKEN=csrftoken)
            self.assertEqual(response.status_code, 404)

            response = client.post(f'/api/match/9999/join/',
                                   HTTP_X_CSRFTOKEN=csrftoken)
            self.assertEqual(response.status_code, 404)

            # starts here
            response = client.get('/api/match/2/', HTTP_X_CSRFTOKEN=csrftoken)
            self.assertEqual(response.status_code, 404)

    def test_http_response_405(self):
        '''Checks if the views module handles bad requests correctly.'''
        client = Client(enforce_csrf_checks=True)
        response = client.get('/api/token/')
        csrftoken = response.cookies['csrftoken'].value
        test_category = create_dummy_category()
        test_user = create_dummy_user('TEST_EMAIL@test.com')
        test_match = create_dummy_match(test_user, test_category)
        # add signup&signin here when implemented

        # starts here
        response = client.delete('/api/match/', HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(response.status_code, 405)

        response = client.delete('/api/match/new/', HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(response.status_code, 405)

        response = client.delete('/api/match/hot/', HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(response.status_code, 405)

        response = client.delete(
            '/api/match/recommend/', HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(response.status_code, 405)

        response = client.delete('/api/match/search',
                                 HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(response.status_code, 405)

        response = client.put('/api/match/3/',
                              json.dumps({'title': 'TEST_TITLE', }),
                              content_type='application/json',
                              HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(response.status_code, 405)

        response = client.delete(f'/api/match/{test_match.id}/join/',
                                 HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(response.status_code, 405)

        response = client.delete(f'/api/match/nlp/',
                                 HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(response.status_code, 405)

    def test_http_response_401(self):
        '''Checks if the views module handles malformed requests correctly.'''
        client = Client(enforce_csrf_checks=True)
        response = client.get('/api/token/')
        csrftoken = response.cookies['csrftoken'].value
        test_category = create_dummy_category()
        test_user = create_dummy_user('TEST_EMAIL@test.com')
        test_match = create_dummy_match(test_user, test_category)

        # starts here
        response = client.post(f'/api/match/{test_match.id}/join/',
                               HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(response.status_code, 401)

    def test_http_response_400(self):
        '''Checks if the views module handles malformed requests correctly.'''
        client = Client(enforce_csrf_checks=True)
        response = client.get('/api/token/')
        csrftoken = response.cookies['csrftoken'].value
        test_category = create_dummy_category()
        test_user = create_dummy_user('TEST_EMAIL@test.com')
        client.login(email='TEST_EMAIL@test.com', password='TEST_PASSWORD')
        test_match = create_dummy_match(test_user, test_category)

        # starts here
        response = client.post('/api/match/',
                               json.dumps({'x': 'hello', 'y': 'match'}),
                               content_type='application/json',
                               HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(response.status_code, 400)
        response = client.post('/api/match/',
                               json.dumps({'title': 'TEST_TITLE',
                                           'category': '0',
                                           'capacity': 'TEST_ERR_STR',
                                           'locationText': 'TEST_LOCATION_TEXT',
                                           'period': 'TEST_ERR_STR',
                                           'additionalInfo': 'TEST_ADDITIONAL_INFO',
                                           'isAgeRestricted': 'TEST_ERR_STR',
                                           'restrictAgeFrom': 'TEST_ERR_STR',
                                           'restrictAgeTo': 'TEST_ERR_STR',
                                           'isGenderRestricted': 'TEST_ERR_STR',
                                           'restrictedGender': settings.MALE,
                                           'timeBegin': '2019-11-03T08:07:46+09:00',
                                           'timeEnd': '2019-11-03T08:07:46+09:00', }),
                               content_type='application/json', HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(response.status_code, 400)
###############
        with tempfile.NamedTemporaryFile() as temp_file:
            form = encode_multipart(BOUNDARY, {
                'matchThumbnail': temp_file,
                'title': 'TEST_TITLE',
                'category': '0',
                'capacity': 5,
                'locationText': 'TEST_LOCATION_TEXT',
                'period': 3,
                'additionalInfo': 'TEST_ADDITIONAL_INFO',
                'isAgeRestricted': True,
                'restrictAgeFrom': 4,
                'restrictAgeTo': 7,
                'isGenderRestricted': True,
                'restrictedGender': settings.MALE,
                'timeBegin': '2019-11-03T08:07:46+09:00',
                'timeEnd': '2019-11-03T08:07:46+09:00',
            })
            response = client.post('/api/match/',
                                   data=form,
                                   content_type=MULTIPART_CONTENT,
                                   HTTP_X_CSRFTOKEN=csrftoken)
            self.assertEqual(response.status_code, 400)

        response = client.post(f'/api/match/{test_match.id}/',
                               json.dumps({'title': 'TEST_TITLE',
                                           'category': '0',
                                           'capacity': 'TEST_ERR_STR',
                                           'locationText': 'TEST_LOCATION_TEXT',
                                           'period': 'TEST_ERR_STR',
                                           'additionalInfo': 'TEST_ADDITIONAL_INFO',
                                           'isAgeRestricted': 'TEST_ERR_STR',
                                           'restrictAgeFrom': 'TEST_ERR_STR',
                                           'restrictAgeTo': 'TEST_ERR_STR',
                                           'isGenderRestricted': 'TEST_ERR_STR',
                                           'restrictedGender': settings.MALE,
                                           'timeBegin': '2019-11-03T08:07:46+09:00',
                                           'timeEnd': '2019-11-03T08:07:46+09:00', }),
                               content_type='application/json', HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(response.status_code, 400)

        response = client.post(f'/api/match/{test_match.id}/',
                               json.dumps({'x': 'hello', 'y': 'match'}),
                               content_type='application/json',
                               HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(response.status_code, 400)
        response = client.post('/api/match/nlp/',
                               json.dumps({'x': 'hello'}),
                               content_type='application/json',
                               HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(response.status_code, 400)

    def test_match(self):
        '''Checks if the views module handles various match-related requests correctly.'''
        with tempfile.NamedTemporaryFile(suffix='.jpg') as temp_file:
            test_image = Image.new('RGB', (100, 100))
            test_image.save(temp_file)
            temp_file.seek(0)

            client = Client(enforce_csrf_checks=True)
            response = client.get('/api/token/')
            csrftoken = response.cookies['csrftoken'].value
            test_user = create_dummy_user('TEST_EMAIL@test.com')
            client.login(email='TEST_EMAIL@test.com', password='TEST_PASSWORD')
            test_category = create_dummy_category()

            test_match = Match.objects.create(
                title='TEST_TITLE', host_user=test_user, category=test_category)
            self.assertEqual(test_match.__str__(), 'TEST_TITLE')

            form = encode_multipart(BOUNDARY, {
                'matchThumbnail': temp_file,
                'title': 'TEST_TITLE',
                'category': '0',
                'capacity': 4,
                'locationText': 'TEST_LOCATION_TEXT',
                'period': 3,
                'additionalInfo': 'TEST_ADDITIONAL_INFO',
                'isAgeRestricted': True,
                'restrictAgeFrom': 4,
                'restrictAgeTo': 7,
                'isGenderRestricted': True,
                'restrictedGender': settings.MALE,
                'timeBegin': '2019-11-03T08:07:46+09:00',
                'timeEnd': '2019-11-03T08:07:46+09:00',
            })
            response = client.post('/api/match/',
                                   data=form,
                                   content_type=MULTIPART_CONTENT,
                                   HTTP_X_CSRFTOKEN=csrftoken)
            self.assertEqual(response.status_code, 201)
            match_id = response.json()['id']
            response = client.get(
                f'/api/match/{match_id}/', HTTP_X_CSRFTOKEN=csrftoken)
            match = response.json()
            self.assertEqual(response.status_code, 200)
            self.assertEqual(match['title'], 'TEST_TITLE')
            self.assertEqual(match['category']['indexes'], '[0]')

            test_match = Match.objects.get(id=match_id)
            self.assertEqual(test_match.view_count, 1)
            response = client.get(
                f'/api/match/{match_id}/', HTTP_X_CSRFTOKEN=csrftoken)
            self.assertEqual(test_match.view_count, 1)

        with tempfile.NamedTemporaryFile(suffix='.jpg') as temp_file:
            test_image = Image.new('RGB', (100, 100))
            test_image.save(temp_file)
            temp_file.seek(0)

            response = client.post(f'/api/match/{match_id}/',
                                   data=form,
                                   content_type=MULTIPART_CONTENT,
                                   HTTP_X_CSRFTOKEN=csrftoken)
            self.assertEqual(response.status_code, 200)

        form = encode_multipart(BOUNDARY, {
            'title': 'TEST_TITLE',
            'category': '0',
            'capacity': 5,
            'locationText': 'TEST_LOCATION_TEXT',
            'period': 3,
            'additionalInfo': 'TEST_ADDITIONAL_INFO',
            'isAgeRestricted': True,
            'restrictAgeFrom': 4,
            'restrictAgeTo': 7,
            'isGenderRestricted': True,
            'restrictedGender': settings.MALE,
            'timeBegin': '2019-11-03T08:07:46+09:00',
            'timeEnd': '2019-11-03T08:07:46+09:00',
            })

        response = client.post(f'/api/match/{match_id}/',
                               data=form,
                               content_type=MULTIPART_CONTENT,
                               HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(response.status_code, 200)

        with tempfile.NamedTemporaryFile() as temp_file:
            form = encode_multipart(BOUNDARY, {
                'matchThumbnail': temp_file,
                'title': 'TEST_TITLE',
                'category': '0',
                'capacity': 5,
                'locationText': 'TEST_LOCATION_TEXT',
                'period': 3,
                'additionalInfo': 'TEST_ADDITIONAL_INFO',
                'isAgeRestricted': True,
                'restrictAgeFrom': 4,
                'restrictAgeTo': 7,
                'isGenderRestricted': True,
                'restrictedGender': settings.MALE,
                'timeBegin': '2019-11-03T08:07:46+09:00',
                'timeEnd': '2019-11-03T08:07:46+09:00',
            })
            response = client.post(f'/api/match/{match_id}/',
                                   data=form,
                                   content_type=MULTIPART_CONTENT,
                                   HTTP_X_CSRFTOKEN=csrftoken)
            self.assertEqual(response.status_code, 400)

            client2 = Client()
            response = client2.post(f'/api/match/{match_id}/',
                                    data=form,
                                    content_type=MULTIPART_CONTENT,
                                    HTTP_X_CSRFTOKEN=csrftoken)
            self.assertEqual(response.status_code, 403)

    @patch.object(nlp, 'enums', mock.Mock(side_effect=GoogleCloudLanguageMock.enums))
    @patch.object(nlp, 'types', mock.Mock(side_effect=GoogleCloudLanguageMock.types))
    @patch.object(nlp, 'LanguageServiceClient',
                  mock.Mock(side_effect=GoogleCloudLanguageMock.LanguageServiceClient))
    def test_nlp(self):
        '''Checks if nlp query works correctly.'''
        client = Client(enforce_csrf_checks=True)
        response = client.get('/api/token/')
        csrftoken = response.cookies['csrftoken'].value
        create_dummy_user('TEST_EMAIL@test.com')
        client.login(email='TEST_EMAIL@test.com', password='TEST_PASSWORD')

        response = client.post('/api/match/nlp/', json.dumps({
            'nlp_text': 'Google, headquartered in Mountain View'}),
                               content_type='application/json',
                               HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(response.status_code, 200)

        response = client.post('/api/match/nlp/', json.dumps({
            'nlp_text': 'Google, headquartered in Mountain View (1600 Amphitheatre '
                        'Pkwy, Mountain View, CA 940430), unveiled the new Android phone for $799'
                        ' at the Consumer Electronic Show. Sundar Pichai said in his keynote that'
                        ' users love their new Android phones.'}),
                               content_type='application/json',
                               HTTP_X_CSRFTOKEN=csrftoken)
        response_dict = json.loads(response.content.decode())
        self.assertEqual(response_dict['categories'],
                         [{'name': '/Internet & Telecom/Mobile & Wireless',
                           'confidence': 0.6100000143051147}])
        self.assertEqual(response_dict['locations'],
                         [{'name': 'Amphitheatre Pkwy', 'type': 'LOCATION'}])
        self.assertEqual(response_dict['events'],
                         [{'name': 'Consumer Electronic Show', 'type': 'EVENT'}])

    @patch.object(nlp, 'enums', mock.Mock(side_effect=GoogleCloudLanguageMock.enums))
    @patch.object(nlp, 'types', mock.Mock(side_effect=GoogleCloudLanguageMock.types))
    @patch.object(nlp, 'LanguageServiceClient',
                  mock.Mock(side_effect=GoogleCloudLanguageMock.LanguageServiceClientEmpty))
    def test_nlp_empty(self):
        '''Checks if the empty nlp response is handled correctly.'''
        client = Client(enforce_csrf_checks=True)
        response = client.get('/api/token/')
        csrftoken = response.cookies['csrftoken'].value
        create_dummy_user('TEST_EMAIL@test.com')
        client.login(email='TEST_EMAIL@test.com', password='TEST_PASSWORD')

        response = client.post('/api/match/nlp/', json.dumps({
            'nlp_text': 'Google, headquartered in Mountain View (1600 Amphitheatre '
                        'Pkwy, Mountain View, CA 940430), unveiled the new Android phone for $799'
                        ' at the Consumer Electronic Show. Sundar Pichai said in his keynote that'
                        ' users love their new Android phones.'}),
                               content_type='application/json',
                               HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(response.status_code, 200)

    @patch.object(nlp, 'enums', mock.Mock(side_effect=GoogleCloudLanguageMock.enums))
    @patch.object(nlp, 'types', mock.Mock(side_effect=GoogleCloudLanguageMock.types))
    @patch.object(nlp, 'LanguageServiceClient',
                  mock.Mock(side_effect=GoogleCloudLanguageMock.LanguageServiceClientInvalid))
    def test_nlp_invalid_argument(self):
        '''Checks if the invalid argument error is handled correctly.'''
        client = Client()
        response = client.get('/api/token/')
        csrftoken = response.cookies['csrftoken'].value
        create_dummy_user('TEST_EMAIL@test.com')
        client.login(email='TEST_EMAIL@test.com', password='TEST_PASSWORD')

        response = client.post('/api/match/nlp/', json.dumps({'nlp_text': '  '}),
                               content_type='application/json',
                               HTTP_X_CSRFOKEN=csrftoken)
        self.assertEqual(response.status_code, 200)

        response_dict = json.loads(response.content.decode())
        self.assertEqual(response_dict['categories'], [{'name': ''}])
        self.assertEqual(response_dict['locations'], [{'name': ''}])
        self.assertEqual(response_dict['events'], [{'name': ''}])

        response = client.post('/api/match/nlp/', json.dumps({'nlp_text': 'Another Invalid Text'}),
                               content_type='application/json',
                               HTTP_X_CSRFOKEN=csrftoken)
        self.assertEqual(response.status_code, 200)

    def test_search(self):
        '''Checks if the views module handles search query correctly.'''
        client = Client(enforce_csrf_checks=True)
        test_user = create_dummy_user('TEST_EMAIL@test.com')
        test_category = create_dummy_category()
        create_dummy_match(test_user, test_category)
        response = client.get('/api/match/search?query=TEST_TITLE')
        self.assertEqual(len(json.loads(response.content.decode())), 1)

    def test_match_new(self):
        '''Checks if get_new_match performs correctly.'''
        # Make complex test cases TODO
        client = Client()
        test_user = create_dummy_user('TEST_EMAIL@test.com')
        test_category = create_dummy_category()
        create_dummy_match(test_user, test_category)
        response = client.get('/api/match/new/')
        self.assertEqual(len(json.loads(response.content.decode())), 1)

    def test_match_hot(self):
        '''Checks if get_hot_match performs correctly.'''
        # Make complex test cases TODO
        client = Client()
        test_user = create_dummy_user('TEST_EMAIL@test.com')
        test_category = create_dummy_category()
        create_dummy_match(test_user, test_category)
        response = client.get('/api/match/hot/')
        self.assertEqual(len(json.loads(response.content.decode())), 1)

    def test_match_recommend(self):
        '''Checks if get_recommend_match performs correctly.'''
        # Make complex test cases TODO
        client = Client()
        test_user = create_dummy_user('TEST_EMAIL@test.com')
        test_category = create_dummy_category()
        create_dummy_match(test_user, test_category)
        response = client.get('/api/match/recommend/')
        self.assertEqual(len(json.loads(response.content.decode())), 1)

    def test_match_join(self):
        '''Checks if match_join performs correctly.'''
        client = Client(enforce_csrf_checks=True)
        response = client.get('/api/token/')
        csrftoken = response.cookies['csrftoken'].value
        test_user = create_dummy_user('TEST_EMAIL@test.com')
        client.login(email='TEST_EMAIL@test.com', password='TEST_PASSWORD')
        test_category = create_dummy_category()
        test_match = create_dummy_match(test_user, test_category)

        response = client.post(f'/api/match/{test_match.id}/join/',
                               HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(response.status_code, 200)
