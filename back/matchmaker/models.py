'''
matchmaker models
'''
from django.db import models
from django.utils import timezone
from django.conf import settings
from django_mysql.models import ListCharField


class Category(models.Model):
    '''
    Category model
    '''
    name = models.CharField(max_length=45)
    indexes = ListCharField(
        max_length=10*10,   # 10 * 9 character nominals, plus commas
        base_field=models.PositiveSmallIntegerField(),
        size=10,  # Maximum of 10 ids in list
        unique=True,
    )

    def __str__(self):
        return self.name


class Interest(models.Model):
    '''
    Interest model
    '''
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='interest_user',
        blank=False
    )
    category = models.ForeignKey(
        Category,
        on_delete=models.CASCADE,
        related_name='interest_category'
    )


class Match(models.Model):
    '''
    Match model
    '''

    def __str__(self):
        return self.title

    title = models.CharField(max_length=100, default='')
    host_user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='match_set',
        blank=False
    )
    match_thumbnail = models.ImageField(
        upload_to='thumbnail/', blank=True, null=True, default='')
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    capacity = models.PositiveSmallIntegerField(default=2)
    is_online = models.BooleanField(default=False)
    is_full = models.BooleanField(default=False)

    location_text = models.CharField(max_length=200, blank=True, default='')
    location_latitude = models.FloatField(blank=True, default=0)
    location_longitude = models.FloatField(
        blank=True, default=0)

    # 0 means not periodic
    period = models.PositiveSmallIntegerField(default=0)
    additional_info = models.TextField(blank=True, default='')

    is_age_restricted = models.BooleanField(default=False)
    restrict_age_from = models.PositiveSmallIntegerField(default=0)
    restrict_age_to = models.PositiveSmallIntegerField(default=0)

    is_gender_restricted = models.BooleanField(default=False)
    restricted_gender = models.BooleanField(default=False)

    time_begin = models.DateTimeField(default=timezone.now)
    time_end = models.DateTimeField(default=timezone.now)

    view_count = models.PositiveIntegerField(default=0)
    created_on = models.DateTimeField(
        auto_now_add=True)


class Participation(models.Model):
    '''
    Participation info
    '''
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='participation_user',
        blank=False
    )
    match = models.ForeignKey(
        Match,
        on_delete=models.CASCADE,
        related_name='participation_match'
    )
    rating = models.PositiveSmallIntegerField(
        default=None, blank=True, null=True)
