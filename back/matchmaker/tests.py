from django.test import TestCase, Client


class MatchMakerTestCase(TestCase):
    def test_test(self):
        client = Client(enforce_csrf_checks=True)
        response = client.get('/api/test/')
        self.assertEqual(response.status_code, 200)
        self.assertEqual('Hello World!', response.content.decode())
