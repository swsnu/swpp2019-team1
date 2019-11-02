'''
matchmaker tests
'''
import json
from django.test import TestCase, Client
from django.conf import settings
from userapp.tests import create_dummy_user
from matchmaker.models import Match, Category


def create_dummy_category():
    '''create dummy category'''
    return Category.objects.create(name="TEST_NAME")


def create_dummy_match():
    '''create dummy match'''
    test_user = create_dummy_user()
    test_category = create_dummy_category()
    return Match.objects.create(
        title='TEST_TITLE', category=test_category, host_user=test_user,
        capacity=4, location_text='TEST_LOCATION')


class MatchMakerTestCase(TestCase):
    """Tests for the app Matchmaker"""

    def test_csrf(self):
        """Tests CSRF"""
        client = Client(enforce_csrf_checks=True)
        create_dummy_user()
        client.login(email='TEST_EMAIL@test.com', password='TEST_PASSWORD')
        test_category = create_dummy_category()
        response = client.post('/api/match/',
                               json.dumps({'title': 'TEST_TITLE',
                                           'categoryId': test_category.id,
                                           'capacity': 4,
                                           'locationText': 'TEST_LOCATION_TEXT',
                                           'period': 3,
                                           'additionalInfo': 'TEST_ADDITIONAL_INFO',
                                           'isAgeRestricted': True,
                                           'restrictAgeFrom': 4,
                                           'restrictAgeTo': 7,
                                           'isGenderRestricted': True,
                                           'restrictedGender': settings.MALE,
                                           'timeBegin': 1572702833.668,
                                           'timeEnd': 1572702833.668, }),
                               content_type='application/json')
        self.assertEqual(response.status_code, 403)

        response = client.get('/api/match/new/')
        csrftoken = response.cookies['csrftoken'].value
        self.assertEqual(response.status_code, 200)

        response = client.post('/api/match/',
                               json.dumps({'title': 'TEST_TITLE',
                                           'categoryId': test_category.id,
                                           'capacity': 4,
                                           'locationText': 'TEST_LOCATION_TEXT',
                                           'period': 3,
                                           'additionalInfo': 'TEST_ADDITIONAL_INFO',
                                           'isAgeRestricted': True,
                                           'restrictAgeFrom': 4,
                                           'restrictAgeTo': 7,
                                           'isGenderRestricted': True,
                                           'restrictedGender': settings.MALE,
                                           'timeBegin': 1572702833.668,
                                           'timeEnd': 1572702833.668, }),
                               content_type='application/json',
                               HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(response.status_code, 201)  # Pass csrf protection

    def test_http_response_404(self):
        """Checks if the views module handles bad requests correctly."""
        client = Client(enforce_csrf_checks=True)
        response = client.get('/api/match/new/')
        csrftoken = response.cookies['csrftoken'].value
        # starts here
        response = client.post('/api/match/',
                               json.dumps({'title': 'TEST_TITLE',
                                           'categoryId': 99999,
                                           'capacity': 4,
                                           'locationText': 'TEST_LOCATION_TEXT',
                                           'period': 3,
                                           'additionalInfo': 'TEST_ADDITIONAL_INFO',
                                           'isAgeRestricted': True,
                                           'restrictAgeFrom': 4,
                                           'restrictAgeTo': 7,
                                           'isGenderRestricted': True,
                                           'restrictedGender': settings.MALE,
                                           'timeBegin': 1572702833.668,
                                           'timeEnd': 1572702833.668, }),
                               content_type='application/json',
                               HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(response.status_code, 404)

    def test_http_response_405(self):
        """Checks if the views module handles bad requests correctly."""
        client = Client(enforce_csrf_checks=True)
        response = client.get('/api/match/new/')
        csrftoken = response.cookies['csrftoken'].value

        # add signup&signin here when implemented

        # starts here
        response = client.delete('/api/match/', HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(response.status_code, 405)

        response = client.delete('/api/match/new/', HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(response.status_code, 405)

        response = client.delete('/api/match/search',
                                 HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(response.status_code, 405)

    def test_http_response_400(self):
        """Checks if the views module handles bad requests correctly."""
        client = Client(enforce_csrf_checks=True)
        response = client.get('/api/match/new/')
        csrftoken = response.cookies['csrftoken'].value
        test_category = create_dummy_category()
        create_dummy_user()
        client.login(email='TEST_EMAIL@test.com', password='TEST_PASSWORD')

        # starts here
        response = client.post('/api/match/',
                               json.dumps({'x': 'hello', 'y': 'match'}),
                               content_type='application/json',
                               HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(response.status_code, 400)
        response = client.post('/api/match/',
                               json.dumps({'title': 'TEST_TITLE',
                                           'categoryId': test_category.id,
                                           'capacity': 'TEST_ERR_STR',
                                           'locationText': 'TEST_LOCATION_TEXT',
                                           'period': 'TEST_ERR_STR',
                                           'additionalInfo': 'TEST_ADDITIONAL_INFO',
                                           'isAgeRestricted': 'TEST_ERR_STR',
                                           'restrictAgeFrom': 'TEST_ERR_STR',
                                           'restrictAgeTo': 'TEST_ERR_STR',
                                           'isGenderRestricted': 'TEST_ERR_STR',
                                           'restrictedGender': settings.MALE,
                                           'timeBegin': 1572702833.668,
                                           'timeEnd': 1572702833.668, }),
                               content_type='application/json',
                               HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(response.status_code, 400)

    def test_match(self):
        """Checks if the views module handles various match-related requests correctly."""
        client = Client(enforce_csrf_checks=True)
        response = client.get('/api/match/new/')
        test_user = create_dummy_user()
        client.login(email='TEST_EMAIL@test.com', password='TEST_PASSWORD')
        test_category = create_dummy_category()
        test_match = Match.objects.create(
            title='TEST_TITLE_STR', host_user=test_user, category=test_category)
        self.assertEqual(test_match.__str__(), "TEST_TITLE_STR")

        csrftoken = response.cookies['csrftoken'].value
        response = client.post('/api/match/',
                               json.dumps({'title': 'TEST_TITLE',
                                           'categoryId': test_category.id,
                                           'capacity': 4,
                                           'locationText': 'TEST_LOCATION_TEXT',
                                           'period': 3,
                                           'additionalInfo': 'TEST_ADDITIONAL_INFO',
                                           'isAgeRestricted': True,
                                           'restrictAgeFrom': 4,
                                           'restrictAgeTo': 7,
                                           'isGenderRestricted': True,
                                           'restrictedGender': settings.MALE,
                                           'timeBegin': 1572702833.668,
                                           'timeEnd': 1572702833.668, }),
                               content_type='application/json',
                               HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(response.status_code, 201)

    def test_search(self):
        """Checks if the views module handles search query correctly."""
        client = Client(enforce_csrf_checks=True)
        create_dummy_match()
        response = client.get('/api/match/search?query=TEST_TITLE')
        self.assertEqual(len(json.loads(response.content.decode())), 1)
