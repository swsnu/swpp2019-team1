'''
matchmaker tests
'''
import json
from django.test import TestCase, Client
from django.conf import settings
from django.forms.models import model_to_dict
import arrow

from userapp.tests import create_dummy_user
from matchmaker.models import Match, Category
from matchmaker.serializers import MatchSerializer


def create_dummy_category():
    '''create dummy category'''
    return Category.objects.create(name='TEST_NAME', indexes=[0, 0])


def create_dummy_match(test_user, test_category):
    '''create dummy match'''
    return Match.objects.create(
        title='TEST_TITLE', category=test_category, host_user=test_user,
        capacity=4, location_text='TEST_LOCATION')


class MatchMakerTestCase(TestCase):
    '''Tests for the app Matchmaker'''

    def setUp(self):
        # TODO Setup test database here
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
        response = client.post('/api/match/',
                               json.dumps({'title': 'TEST_TITLE',
                                           'category': test_category.indexes,
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
                                           'timeEnd': '2019-11-03T08:07:46+09:00', }),
                               content_type='application/json',
                               HTTP_X_CSRFTOKEN=csrftoken)
        serializer = MatchSerializer(response.json(), data=response.json())
        self.assertEqual(serializer.is_valid(), True)
        self.assertEqual(serializer.data['num_participants'], 1)

        test_match_dict = model_to_dict(test_match)
        test_match_dict['category'] = test_category
        test_match_dict['host_user_id'] = test_user.id
        del test_match_dict['host_user']
        del test_match_dict['match_thumbnail']
        print("FIRST", test_match_dict)
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
        print("SECOND", test_match_dict)
        self.assertEqual(serializer.is_valid(), True)
        self.assertEqual(serializer.data['num_participants'], 0)

    def test_category(self):
        '''test category'''
        dummy_category = create_dummy_category()
        self.assertEqual(dummy_category.__str__(), 'TEST_NAME')

    def test_http_response_404(self):
        '''Checks if the views module handles bad requests correctly.'''
        client = Client(enforce_csrf_checks=True)
        response = client.get('/api/token/')
        csrftoken = response.cookies['csrftoken'].value
        create_dummy_user('TEST_EMAIL@test.com')
        client.login(email='TEST_EMAIL@test.com', password='TEST_PASSWORD')
        # starts here
        response = client.post('/api/match/',
                               json.dumps({'title': 'TEST_TITLE',
                                           'category': [99999, 99999],
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
                                           'timeEnd': '2019-11-03T08:07:46+09:00', }),
                               content_type='application/json',
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

        response = client.post('/api/match/3/',
                               json.dumps({'title': 'TEST_TITLE', }),
                               content_type='application/json',
                               HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(response.status_code, 405)

        response = client.delete(f'/api/match/{test_match.id}/join/',
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
                                           'category': test_category.indexes,
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

        response = client.put(f'/api/match/{test_match.id}/',
                              json.dumps({'title': 'TEST_TITLE',
                                          'category': test_category.indexes,
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

        response = client.put(f'/api/match/{test_match.id}/',
                              json.dumps({'x': 'hello', 'y': 'match'}),
                              content_type='application/json',
                              HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(response.status_code, 400)

    def test_match(self):
        '''Checks if the views module handles various match-related requests correctly.'''
        client = Client(enforce_csrf_checks=True)
        response = client.get('/api/token/')
        csrftoken = response.cookies['csrftoken'].value
        test_user = create_dummy_user('TEST_EMAIL@test.com')
        client.login(email='TEST_EMAIL@test.com', password='TEST_PASSWORD')
        test_category = create_dummy_category()

        test_match = Match.objects.create(
            title='TEST_TITLE', host_user=test_user, category=test_category)
        self.assertEqual(test_match.__str__(), 'TEST_TITLE')

        response = client.post('/api/match/',
                               json.dumps({'title': 'TEST_TITLE',
                                           'category': test_category.indexes,
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
                                           'timeEnd': '2019-11-03T08:07:46+09:00', }),
                               content_type='application/json',
                               HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(response.status_code, 201)
        match_id = response.json()['id']
        response = client.get(
            f'/api/match/{match_id}/', HTTP_X_CSRFTOKEN=csrftoken)
        match = response.json()
        self.assertEqual(response.status_code, 200)
        self.assertEqual(match['title'], 'TEST_TITLE')
        self.assertEqual(match['category']['indexes'], '[0, 0]')

        test_match = Match.objects.get(id=match_id)
        self.assertEqual(test_match.view_count, 1)
        response = client.get(
            f'/api/match/{match_id}/', HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(test_match.view_count, 1)

        response = client.put(f'/api/match/{match_id}/',
                              json.dumps({'title': 'TEST_PUT_TITLE',
                                          'category': test_category.indexes,
                                          'capacity': 4,
                                          'locationText': 'TEST_PUT_LOCATION_TEXT',
                                          'period': 3,
                                          'additionalInfo': 'TEST_PUT_ADDITIONAL_INFO',
                                          'isAgeRestricted': True,
                                          'restrictAgeFrom': 4,
                                          'restrictAgeTo': 7,
                                          'isGenderRestricted': True,
                                          'restrictedGender': settings.MALE,
                                          'timeBegin': '2019-11-03T08:07:46+09:00',
                                          'timeEnd': '2019-11-03T08:07:46+09:00', }),
                              content_type='application/json',
                              HTTP_X_CSRFTOKEN=csrftoken)
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
        # TODO Make complex test cases
        client = Client()
        response = client.get('/api/match/new/')
        self.assertEqual(len(json.loads(response.content.decode())), 0)

    def test_match_hot(self):
        '''Checks if get_hot_match performs correctly.'''
        # TODO Make complex test cases
        client = Client()
        response = client.get('/api/match/hot/')
        self.assertEqual(len(json.loads(response.content.decode())), 0)

    def test_match_recommend(self):
        '''Checks if get_recommend_match performs correctly.'''
        # TODO Make complex test cases
        client = Client()
        response = client.get('/api/match/recommend/')
        self.assertEqual(len(json.loads(response.content.decode())), 0)

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
