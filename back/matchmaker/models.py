from django.db import models
from django.utils import timezone


class Match(models.Model):

    CATEGORY_NONE = 0
    CATEGORY_GAME = 1
    CATEGORY_STUDY = 2
    CATEGORY_SPORTS = 3

    CATEGORY_CHOICES = (
        (CATEGORY_NONE, 'None'),
        (CATEGORY_GAME, 'Game'),
        (CATEGORY_STUDY, 'Study'),
        (CATEGORY_SPORTS, 'Sports'),
    )

    def __str__(self):
        return self.title

    title = models.CharField(max_length=100, default='')
    # User model not yet implemented
    # hostUser = models.ForeignKey(
    #         User,
    #         on_delete=models.CASCADE,
    #         related_name='match_set',
    # )
    # thumbnail
    categoryID = models.PositiveSmallIntegerField(
        choices=CATEGORY_CHOICES,
        default=CATEGORY_NONE
    )
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
