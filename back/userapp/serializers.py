from rest_framework import serializers
from userapp.models import User
from django.conf import settings #settings.AUTH_USER_MODEL

class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField()

    class Meta:
        model = User
        fields = ('id', 'email', 'username', 'firstName', 'lastName', 'phoneNumber', 'gender', 'birthdate',
                'message', 'profilePicture', 'emailPublic', 'schedulePublic', 'interestPublic','password')
        validators = []

    def create(self, validated_data):
        user = super(UserSerializer, self).create(validated_data)
        user.set_password(validated_data['password'])
        user.save()
        return user
    
    def update(self, instance, validated_data):
        instance.username = validated_data.get('username', instance.username)
        instance.phoneNumber = validated_data.get('phoneNumber', instance.phoneNumber)
        instance.message = validated_data.get('message', instance.message)
        instance.profilePicture = validated_data.get('profilePicture', instance.profilePicture)
        instance.emailPublic = validated_data.get('emailPublic', instance.emailPublic)
        instance.schedulePublic = validated_data.get('schedulePublic', instance.schedulePublic)
        instance.interestPublic = validated_data.get('interestPublic', instance.interestPublic)

        instance.set_password(validated_data['password'])
        instance.save()
        return instance
