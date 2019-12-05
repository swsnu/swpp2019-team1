''' matchmaker serializer '''
from rest_framework import serializers
from matchmaker.models import Match, Participation, Category


class MatchSerializer(serializers.ModelSerializer):
    ''' match serializer '''
    num_participants = serializers.SerializerMethodField('_num_participants')
    host = serializers.RelatedField(read_only=True)

    class Meta:
        model = Match
        fields = '__all__'
        extra_fields = ['num_participants', 'host']
        validators = []
        depth = 1

    def _num_participants(self, obj):
        # pylint: disable=no-self-use
        if isinstance(obj, dict):
            participation = Participation.objects.filter(match=obj["id"])
        else:
            participation = Participation.objects.filter(match=obj.id)
        return participation.count()

    def create(self, validated_data):
        match = super(MatchSerializer, self).create(
            validated_data)
        match.save()
        return match

    def update(self, instance, validated_data):
        instance.title = validated_data.get('title', instance.title)
        new_match_thumbnail = validated_data.get(
            'match_thumbnail', instance.match_thumbnail)
        instance.match_thumbnail = new_match_thumbnail

        instance.category_id = validated_data.get(
            'category_id', instance.category_id)
        instance.capacity = validated_data.get('capacity', instance.capacity)
        instance.location_text = validated_data.get(
            'location_text', instance.location_text)
        instance.location_latitude = validated_data.get(
            'location_latitude', instance.location_latitude)
        instance.location_longitude = validated_data.get(
            'location_longitude', instance.location_longitude)
        instance.additional_info = validated_data.get(
            'additional_info', instance.additional_info)
        instance.time_begin = validated_data.get(
            'time_begin', instance.time_begin)
        instance.time_end = validated_data.get(
            'time_end', instance.time_end)
        instance.save()
        return instance


class CategorySerializer(serializers.ModelSerializer):
    ''' category serializer '''
    indexes = serializers.ListField(
        child=serializers.IntegerField(min_value=0, max_value=100)
    )

    class Meta:
        model = Category
        fields = '__all__'
        validators = []
        depth = 1


class ParticipationSerializer(serializers.ModelSerializer):
    ''' participation serializer '''
    class Meta:
        model = Participation
        fields = '__all__'
        validators = []
        depth = 1

    def create(self, validated_data):
        participation = super(ParticipationSerializer, self).create(
            validated_data)
        participation.save()
        return participation
