''' Custom user model serializer '''
from rest_framework import serializers
from userapp.models import User
# from django.conf import settings  # settings.AUTH_USER_MODEL


class UserSerializer(serializers.ModelSerializer):
    ''' Custom user model serializer '''
    password = serializers.CharField()

    class Meta:
        model = User
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
