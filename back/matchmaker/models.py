'''
matchmaker models
'''
from django.db import models
from django.utils import timezone
from userapp.models import User


class Category(models.Model):
    '''
    Category model
    '''
    name = models.CharField(max_length=45)


class Match(models.Model):
    '''
    Match model
    '''

    def __str__(self):
        return self.title

    title = models.CharField(max_length=100, default='')
    hostUserID = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name='match_set',
        blank=False
    )
    matchThumbnail = models.ImageField(
        upload_to='thumbnail/', blank=True, null=True)
    categoryID = models.ForeignKey(Category, on_delete=models.CASCADE)
    capacity = models.PositiveSmallIntegerField(default=2)
    numParticipants = models.PositiveSmallIntegerField(default=1)
    isFull = models.BooleanField(default=False)

    locationText = models.CharField(max_length=100, default='')
    # locationLatitude = models.PositiveSmallIntegerField(default=0)
    # locationLongitude = models.PositiveSmallIntegerField(default=0)

    # 0 means not periodic
    period = models.PositiveSmallIntegerField(default=0)
    additionalInfo = models.TextField(default='')

    isAgeRestricted = models.BooleanField(default=False)
    restrictAgeFrom = models.PositiveSmallIntegerField(default=0)
    restrictAgeTo = models.PositiveSmallIntegerField(default=0)

    MALES_ARE_RESTRICTED = False
    FEMALES_ARE_RESTRICTED = True
    isGenderRestricted = models.BooleanField(default=False)
    restrictedGender = models.BooleanField(default=False)

    timeBegin = models.DateTimeField(default=timezone.now)
    timeEnd = models.DateTimeField(default=timezone.now)

    viewCount = models.PositiveIntegerField(default=0)
    created_on = models.DateTimeField(
        auto_now_add=True)
