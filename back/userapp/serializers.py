''' Custom user model serializer '''
from rest_framework import serializers
from django.contrib.auth import get_user_model
from django.conf import settings
from djoser.serializers import TokenSerializer
from djoser.conf import settings as djoser_settings
from stream_chat import StreamChat


class StreamTokenSerializer(TokenSerializer):
    '''stream token serializer'''
    stream_token = serializers.SerializerMethodField()

    class Meta:
        model = djoser_settings.TOKEN_MODEL
        fields = ('auth_token', 'stream_token')

    # pylint: disable=no-self-use
    def get_stream_token(self, obj):
        '''get stream token'''
        chat_client = StreamChat(api_key=settings.STREAM_KEY,
                                 api_secret=settings.STREAM_SECRET)
        token = chat_client.create_token(f'user{obj.user.id}')
        return token.decode('ascii')


class UserSerializer(serializers.ModelSerializer):
    ''' Custom user model serializer '''
    password = serializers.CharField()

    class Meta:
        model = get_user_model()
        fields = ('id', 'email', 'username',
                  'first_name', 'last_name',
                  'phone_number', 'gender', 'birthdate',
                  'message', 'profile_picture',
                  'is_email_public', 'is_schedule_public', 'is_interest_public',
                  'password')
        validators = []

    def create(self, validated_data):
        user = super(UserSerializer, self).create(validated_data)
        user.set_password(validated_data['password'])
        user.save()
        return user

    def update(self, instance, validated_data):
        '''instance.username = validated_data.get('username', instance.username)
        instance.phone_number = validated_data.get(
            'phone_number', instance.phone_number)
        instance.message = validated_data.get('message', instance.message)
        instance.profile_picture = validated_data.get(
            'profile_picture', instance.profile_picture)
        instance.is_email_public = validated_data.get(
            'is_email_public', instance.is_email_public)
        instance.is_schedule_public = validated_data.get(
            'is_schedule_public', instance.is_schedule_public)
        instance.is_interest_public = validated_data.get(
            'is_interest_public', instance.is_interest_public)

        instance.set_password(validated_data['password'])'''
        super(UserSerializer, self).update(
            instance, validated_data)
        if 'password' in validated_data:
            instance.set_password(validated_data.get(
                'password', instance.password))
        instance.save()
        return instance
