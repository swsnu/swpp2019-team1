''' matchmaker serializer '''
from rest_framework import serializers
from matchmaker.models import Match
# from django.conf import settings  # settings.AUTH_USER_MODEL


class MatchSerializer(serializers.ModelSerializer):
    ''' match serializer '''

    class Meta:
        model = Match
        fields = '__all__'
        validators = []
        depth = 1
    '''def create(self, validated_data):
        match = super(MatchSerializer, self).create(
            validated_data)
        match.save()
        return match'''

    '''def update(self, instance, validated_data):
        instance.title = validated_data.get('title', instance.title)
        instance.category_id = validated_data.get(
            'category_id', instance.category_id)
        instance.capacity = validated_data.get('capacity', instance.capacity)
        instance.location_text = validated_data.get(
            'location_text', instance.location_text)
        instance.period = validated_data.get(
            'period', instance.period)
        instance.additional_info = validated_data.get(
            'additional_info', instance.additional_info)
        instance.is_age_restricted = validated_data.get(
            'is_age_restricted', instance.is_age_restricted)

        instance.save()
        return instance'''
