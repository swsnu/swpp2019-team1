import json
from django.test import TestCase
from django.test import TestCase, Client
from .models import User

# Create your tests here.

class UserappTestCase(TestCase):
    def test_signout(self):
        client = Client(enforce_csrf_checks=False)
        
        response = client.post('/api/user/signout/',
                                content_type='application/json')
        self.assertEqual(response.status_code, 400)

        response = client.post('/api/user/signup/',
                               json.dumps({
                                   'email': 'test@test.com',
                                   'password':'zxcvbn123456!',
                                   'username':'nick',
                                   'firstName':'first',
                                   'lastName':'last',
                                   'phoneNumber':'01000000000',
                                   'gender':'1',
                                   'birthdate':'2000-01-01',
                                   'message':'None',
                                   'emailPublic':'1',
                                   'schedulePublic':'1',
                                   'interestPublic':'1'
                                }),                          
                               content_type='application/json')
        self.assertEqual(response.status_code, 200)

        response = client.post('/api/user/signin/',
                                json.dumps({
                                    'email': 'test@test.com',
                                    'password' : 'zxcvbn123456!'
                                }),
                                content_type='application/json')
        self.assertEqual(response.status_code, 200)
        
        response = client.post('/api/user/signin/',
                                json.dumps({
                                    'email': 'test@test.com',
                                    'password' : 'zxcvebn123456'
                                }),
                                content_type='application/json')
        self.assertEqual(response.status_code, 400)
        
    def test_signin(self):
        client = Client(enforce_csrf_checks=False)
        response = client.post('/api/user/signup/',
                               json.dumps({
                                   'email': 'test@test.com',
                                   'password':'zxcvbn123456!',
                                   'username':'nick',
                                   'firstName':'first',
                                   'lastName':'last',
                                   'phoneNumber':'01000000000',
                                   'gender':'1',
                                   'birthdate':'2000-01-01',
                                   'message':'None',
                                   'emailPublic':'1',
                                   'schedulePublic':'1',
                                   'interestPublic':'1'
                                }),                          
                               content_type='application/json')
        self.assertEqual(response.status_code, 200)

        response = client.post('/api/user/signin/',
                                json.dumps({
                                    'email': 'test@test.com',
                                    'password' : 'zxcvbn123456!'
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
        client = Client(enforce_csrf_checks=False)
        response = client.post('/api/user/signup/',
                               json.dumps({
                                   'email': 'test@test.com',
                                   'password':'zxcvbn123456!',
                                   'username':'nick',
                                   'firstName':'first',
                                   'lastName':'last',
                                   'phoneNumber':'01000000000',
                                   'gender':'1',
                                   'birthdate':'2000-01-01',
                                   'message':'None',
                                   'emailPublic':'1',
                                   'schedulePublic':'1',
                                   'interestPublic':'1'}),                          
                               content_type='application/json')
        self.assertEqual(response.status_code, 200)