'''
userapp test
'''
import json
from django.test import TestCase, Client
from .models import User


class UserappTestCase(TestCase):
    '''test userapp'''

    def test_usermodel(self):
        '''test user model'''
        with self.assertRaises(ValueError):
            User.objects.create_user(email="")

    def test_signout(self):
        '''test sign out'''
        client = Client(enforce_csrf_checks=False)

        response = client.post('/api/user/signout/',
                               content_type='application/json')
        self.assertEqual(response.status_code, 400)

        response = client.post('/api/user/signup/',
                               json.dumps({
                                   'email': 'test@test.com',
                                   'password': 'zxcvbn123456!',
                                   'username': 'nick',
                                   'firstName': 'first',
                                   'lastName': 'last',
                                   'phoneNumber': '010-1234-5678',
                                   'gender': 'true',
                                   'birthdate': '2000-01-01',
                                   'message': 'None',
                                   'isEmailPublic': 'true',
                                   'isSchedulePublic': 'true',
                                   'isInterestPublic': 'true'
                               }),
                               content_type='application/json')
        self.assertEqual(response.status_code, 200)

        response = client.post('/api/user/signin/',
                               json.dumps({
                                   'email': 'test@test.com',
                                   'password': 'zxcvbn123456!'
                               }),
                               content_type='application/json')
        self.assertEqual(response.status_code, 200)

        response = client.post('/api/user/signin/',
                               json.dumps({
                                   'email': 'test@test.com',
                                   'password': 'zxcvebn123456'
                               }),
                               content_type='application/json')
        self.assertEqual(response.status_code, 400)

    def test_signin(self):
        '''test sign in'''
        client = Client(enforce_csrf_checks=False)
        response = client.post('/api/user/signup/',
                               json.dumps({
                                   'email': 'test@test.com',
                                   'password': 'zxcvbn123456!',
                                   'username': 'nick',
                                   'firstName': 'first',
                                   'lastName': 'last',
                                   'phoneNumber': '010-1234-5678',
                                   'gender': 'true',
                                   'birthdate': '2000-01-01',
                                   'message': 'None',
                                   'isEmailPublic': 'true',
                                   'isSchedulePublic': 'true',
                                   'isInterestPublic': 'true'
                               }),
                               content_type='application/json')
        self.assertEqual(response.status_code, 200)

        response = client.post('/api/user/signin/',
                               json.dumps({
                                   'email': 'test@test.com',
                                   'password': 'zxcvbn123456!'
                               }),
                               content_type='application/json')
        self.assertEqual(response.status_code, 200)

        response = client.post('/api/user/signout/',
                               content_type='application/json')
        self.assertEqual(response.status_code, 200)

        response = client.post('/api/user/signout/',
                               content_type='application/json')
        self.assertEqual(response.status_code, 400)

    def test_signup(self):
        '''test sign up'''
        client = Client(enforce_csrf_checks=False)
        response = client.post('/api/user/signup/',
                               json.dumps({
                                   'email': 'test@test.com',
                                   'password': 'zxcvbn123456!',
                                   'username': 'nick',
                                   'firstName': 'first',
                                   'lastName': 'last',
                                   'phoneNumber': '010-1234-5678',
                                   'gender': 'true',
                                   'birthdate': '2000-01-01',
                                   'message': 'None',
                                   'isEmailPublic': 'true',
                                   'isSchedulePublic': 'true',
                                   'isInterestPublic': 'true'}),
                               content_type='application/json')
        self.assertEqual(response.status_code, 200)

        response = client.post('/api/user/signup/',
                               json.dumps({
                                   'password': 'zxcvbn123456!',
                                   'username': 'nick',
                                   'firstName': 'first',
                                   'lastName': 'last',
                                   'phoneNumber': '010-1234-5678',
                                   'gender': 'true',
                                   'birthdate': '2000-01-01',
                                   'message': 'None',
                                   'isEmailPublic': 'true',
                                   'isSchedulePublic': 'true',
                                   'isInterestPublic': 'true'}),
                               content_type='application/json')
        self.assertEqual(response.status_code, 400)
