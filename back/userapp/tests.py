'''
userapp test
'''
import json
from django.test import TestCase, Client
from django.conf import settings
from django.contrib.auth import get_user_model
from matchmaker.models import Match, Category, Participation
#from matchmaker.tests import create_dummy_category

USER = get_user_model()


def create_dummy_user(email):
    '''create dummy user'''
    return USER.objects.create_user(email=email, password='TEST_PASSWORD',
                                    username='TEST_USERNAME', first_name='TEST_FIRST_NAME',
                                    last_name='TEST_LAST_NAME', phone_number='010-1234-5678',
                                    gender=settings.MALE, birthdate='2000-01-01',
                                    is_email_public=False, is_interest_public=False)


class UserappTestCase(TestCase):
    '''test userapp'''

    def test_user_model(self):
        '''test user model'''
        with self.assertRaises(ValueError):
            USER.objects.create_user(email='')
        test_user = create_dummy_user('TEST_EMAIL@test.com')
        self.assertEqual(test_user.__str__(), test_user.username)
        self.assertEqual(test_user.get_full_name(),
                         f'{test_user.first_name} {test_user.last_name}')
        self.assertEqual(test_user.get_short_name(), test_user.first_name)
        self.assertEqual(test_user.has_perm("test_perm"), True)
        self.assertEqual(test_user.has_module_perms("test_app_label"), True)

    def test_create_superuser(self):
        '''test create superuser'''
        with self.assertRaises(ValueError):
            USER.objects.create_superuser(
                email='TEST_EMAIL@test.com', password='TEST_PASSWORD',
                username='TEST_USERNAME', first_name='TEST_FIRST_NAME',
                last_name='TEST_LAST_NAME', phone_number='010-1234-5678',
                gender=settings.MALE, birthdate='2000-01-01',
                is_email_public=False, is_interest_public=False, is_superuser=False)
        test_superuser = USER.objects.create_superuser(
            email='TEST_EMAIL@test.com', password='TEST_PASSWORD',
            username='TEST_USERNAME', first_name='TEST_FIRST_NAME',
            last_name='TEST_LAST_NAME', phone_number='010-1234-5678',
            gender=settings.MALE, birthdate='2000-01-01',
            is_email_public=False, is_interest_public=False)
        self.assertIsInstance(test_superuser, USER)

    def test_csrf(self):
        ''' test csrf '''
        client = Client(enforce_csrf_checks=True)

        # GET request
        response = client.get('/api/token/')
        self.assertEqual(response.status_code, 204)
        # Get csrf token from cookie
        csrftoken = response.cookies['csrftoken'].value

        # Not allowed request returns 405 response
        response = client.post('/api/token/',
                               json.dumps(
                                   {'token': 'TEST_STR'}),
                               content_type='application/json',
                               HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(response.status_code, 405)

        response = client.post('/api/user/signup/',
                               json.dumps({
                                   'email': 'TEST_EMAIL@test.com',
                                   'password': 'TEST_PASSWORD',
                                   'username': 'TEST_USERNAME',
                                   'firstName': 'TEST_FIRST_NAME',
                                   'lastName': 'TEST_LAST_NAME',
                                   'phoneNumber': '010-1234-5678',
                                   'gender': True,
                                   'birthdate': '2000-01-01',
                                   'message': 'None',
                                   'isEmailPublic': True,
                                   'isSchedulePublic': True,
                                   'isInterestPublic': True}),
                               content_type='application/json',
                               HTTP_X_CSRFTOKEN=csrftoken)
        # Pass csrf protection
        self.assertEqual(response.status_code, 201)

    def test_signup(self):
        '''test sign up'''
        client = Client(enforce_csrf_checks=True)
        response = client.get('/api/token/')
        csrftoken = response.cookies['csrftoken'].value
        # not allowed
        response = client.put('/api/user/signup/',
                              json.dumps({
                                  'password': 'TEST_PASSWORD',
                                  'username': 'TEST_USERNAME',
                                  'firstName': 'TEST_FIRST_NAME',
                                  'lastName': 'TEST_LAST_NAME',
                                  'phoneNumber': '010-1234-5678',
                                  'gender': True,
                                  'birthdate': '2000-01-01',
                                  'message': 'None',
                                  'isEmailPublic': True,
                                  'isSchedulePublic': True,
                                  'isInterestPublic': True}),
                              content_type='application/json',
                              HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(response.status_code, 405)
        # bad request
        response = client.post('/api/user/signup/',
                               json.dumps({
                                   'password': 'TEST_PASSWORD',
                                   'username': 'TEST_USERNAME',
                                   'firstName': 'TEST_FIRST_NAME',
                                   'lastName': 'TEST_LAST_NAME',
                                   'phoneNumber': '010-1234-5678',
                                   'gender': True,
                                   'birthdate': '2000-01-01',
                                   'message': 'None',
                                   'isEmailPublic': True,
                                   'isSchedulePublic': True,
                                   'isInterestPublic': True}),
                               content_type='application/json',
                               HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(response.status_code, 400)
        # sign up
        response = client.post('/api/user/signup/',
                               json.dumps({
                                   'email': 'TEST_EMAIL@test.com',
                                   'password': 'TEST_PASSWORD',
                                   'username': 'TEST_USERNAME',
                                   'firstName': 'TEST_FIRST_NAME',
                                   'lastName': 'TEST_LAST_NAME',
                                   'phoneNumber': '010-1234-5678',
                                   'gender': True,
                                   'birthdate': '2000-01-01'}),
                               content_type='application/json',
                               HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(response.status_code, 201)

    def test_signin(self):
        '''test sign in'''
        client = Client(enforce_csrf_checks=True)
        response = client.get('/api/token/')
        csrftoken = response.cookies['csrftoken'].value
        create_dummy_user('TEST_EMAIL@test.com')
        # not allowed
        response = client.put('/api/user/signin/',
                              json.dumps({
                                  'email': 'TEST_EMAIL@test.com',
                                  'password': 'TEST_PASSWORD'
                              }),
                              content_type='application/json',
                              HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(response.status_code, 405)
        # bad request
        response = client.post('/api/user/signin/',
                               json.dumps({
                                   'email': 'TEST_EMAIL@test.com',
                                   'password': 'zxcvebn123456'
                               }),
                               content_type='application/json',
                               HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(response.status_code, 400)
        # sign in
        response = client.post('/api/user/signin/',
                               json.dumps({
                                   'email': 'TEST_EMAIL@test.com',
                                   'password': 'TEST_PASSWORD'
                               }),
                               content_type='application/json',
                               HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(response.status_code, 200)

    def test_signout(self):
        '''test sign out'''
        client = Client(enforce_csrf_checks=True)
        response = client.get('/api/token/')
        csrftoken = response.cookies['csrftoken'].value
        create_dummy_user('TEST_EMAIL@test.com')
        # unauthenticated
        response = client.post('/api/user/signout/',
                               content_type='application/json',
                               HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(response.status_code, 401)

        client.login(email='TEST_EMAIL@test.com', password='TEST_PASSWORD')
        response = client.get('/api/token/')
        csrftoken = response.cookies['csrftoken'].value
        # not allowed
        response = client.put('/api/user/signout/',
                              content_type='application/json',
                              HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(response.status_code, 405)

        # sign out
        response = client.post('/api/user/signout/',
                               content_type='application/json',
                               HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(response.status_code, 204)

    def test_user_detail(self):
        '''test user detail'''
        client = Client(enforce_csrf_checks=True)
        test_user = create_dummy_user('TEST_EMAIL@test.com')
        test_category = Category.objects.create(name='TEST_NAME', indexes=[0])
        test_match = Match.objects.create(
            title='TEST_TITLE', host_user=test_user, category=test_category)
        Participation.objects.create(user=test_user, match=test_match)
        response = client.get('/api/token/')
        csrftoken = response.cookies['csrftoken'].value
        last_password = test_user.password
        # not found
        response = client.get('/api/user/99999/',
                              content_type='application/json',
                              HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(response.status_code, 404)
        # not allowed
        response = client.delete(f'/api/user/{test_user.id}/',
                                 content_type='application/json',
                                 HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(response.status_code, 405)
        '''test get user'''
        # get user detail
        response = client.get(f'/api/user/{test_user.id}/',
                              content_type='application/json',
                              HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(response.status_code, 200)
        '''test put user'''
        # bad request
        response = client.patch(f'/api/user/{test_user.id}/',
                                json.dumps({'birthdate': 'TEST_ERR_DATE'}),
                                content_type='application/json',
                                HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(response.status_code, 400)
        # patch user detail
        response = client.patch(f'/api/user/{test_user.id}/',
                                json.dumps(
                                    {'birthdate': '2019-11-6'}),
                                content_type='application/json',
                                HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(response.status_code, 200)
        # patch user password
        response = client.patch(f'/api/user/{test_user.id}/',
                                json.dumps(
                                    {'password': 'TEST_CHANGED_PASSWORD'}),
                                content_type='application/json',
                                HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(response.status_code, 200)
        changed_password = USER.objects.get(id=test_user.id).password
        self.assertNotEqual(changed_password, last_password)
