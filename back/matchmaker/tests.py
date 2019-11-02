'''
matchmaker tests
'''
import json
import datetime
from django.test import TestCase, Client
from userapp.models import User
from .models import Match, Category


def create_dummy_user():
    '''create dummy user'''
    return User.objects.create_user(email="swpp@snu.ac.kr", password="test_password",
                                    username="TEST_USERNAME", first_name="TEST_FIRST_NAME",
                                    last_name="TEST_LAST_NAME", phone_number="010-1234-5678",
                                    gender=True, birthdate=datetime.date(2019, 11, 2),
                                    is_email_public=False, is_interest_public=False)


class MatchMakerTestCase(TestCase):
    """Tests for the app Matchmaker"""

    def setUp(self):
        Match.objects.create(
            title='TEST_TITLE', categoryID=1, capacity=4, locationText='TEST_LOCATION')

    def test_csrf(self):
        """Tests CSRF"""
        client = Client(enforce_csrf_checks=True)
        create_dummy_user()
        client.login(email='swpp@snu.ac.kr', password='test_password')
        test_category = Category.objects.create(name="TEST_NAME")
        response = client.post('/api/match/',
                               json.dumps({'title': 'TEST_TITLE',
                                           'categoryID': test_category.id,
                                           'capacity': 4,
                                           'locationText': 'TEST_LOCATION_TEXT',
                                           'period': 3,
                                           'additionalInfo': 'TEST_ADDITIONAL_INFO',
                                           'isAgeRestricted': True,
                                           'restrictAgeFrom': 4,
                                           'restrictAgeTo': 7,
                                           'isGenderRestricted': True,
                                           'restrictedGender': Match.MALES_ARE_RESTRICTED,
                                           'timeBegin': [1234, 12, 1, 21, 13, 14],
                                           'timeEnd': [1245, 1, 12, 23, 1, 55], }),
                               content_type='application/json')
        self.assertEqual(response.status_code, 403)

        response = client.get('/api/match/new/')
        csrftoken = response.cookies['csrftoken'].value
        self.assertEqual(response.status_code, 200)

        response = client.post('/api/match/',
                               json.dumps({'title': 'TEST_TITLE',
                                           'categoryID': test_category.id,
                                           'capacity': 4,
                                           'locationText': 'TEST_LOCATION_TEXT',
                                           'period': 3,
                                           'additionalInfo': 'TEST_ADDITIONAL_INFO',
                                           'isAgeRestricted': True,
                                           'restrictAgeFrom': 4,
                                           'restrictAgeTo': 7,
                                           'isGenderRestricted': True,
                                           'restrictedGender': Match.MALES_ARE_RESTRICTED,
                                           'timeBegin': [1234, 12, 1, 21, 13, 14],
                                           'timeEnd': [1245, 1, 12, 23, 1, 55], }),
                               content_type='application/json',
                               HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(response.status_code, 201)  # Pass csrf protection

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

        # add signup&signin here when implemented

        # starts here
        response = client.post('/api/match/',
                               json.dumps({'x': 'hello', 'y': 'match'}),
                               content_type='application/json',
                               HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(response.status_code, 400)

    def test_match(self):
        """Checks if the views module handles various match-related requests correctly."""
        client = Client(enforce_csrf_checks=True)
        response = client.get('/api/match/new/')
        test_user = create_dummy_user()
        client.login(email='swpp@snu.ac.kr', password='test_password')
        test_category = Category.objects.create(name="TEST_CATEGORY_NAME")
        test_match = Match.objects.create(
            title='TEST_TITLE_STR', hostUserID=test_user, categoryID=test_category)
        self.assertEqual(test_match.__str__(), "TEST_TITLE_STR")

        csrftoken = response.cookies['csrftoken'].value
        response = client.post('/api/match/',
                               json.dumps({'title': 'TEST_TITLE',
                                           'categoryID': 1,
                                           'capacity': 4,
                                           'locationText': 'TEST_LOCATION_TEXT',
                                           'period': 3,
                                           'additionalInfo': 'TEST_ADDITIONAL_INFO',
                                           'isAgeRestricted': True,
                                           'restrictAgeFrom': 4,
                                           'restrictAgeTo': 7,
                                           'isGenderRestricted': True,
                                           'restrictedGender': Match.MALES_ARE_RESTRICTED,
                                           'timeBegin': [1234, 12, 1, 21, 13, 14],
                                           'timeEnd': [1245, 1, 12, 23, 1, 55], }),
                               content_type='application/json',
                               HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(response.status_code, 201)

    def test_search(self):
        """Checks if the views module handles search query correctly."""
        client = Client(enforce_csrf_checks=True)
        response = client.get('/api/match/search?query=TITLE')
        self.assertEqual(len(json.loads(response.content.decode())), 1)
