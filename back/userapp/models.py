from django.db import models
from django.conf import settings
from django.contrib.auth.models import PermissionsMixin
from django.contrib.auth.models import Group
from django.contrib.auth.models import Permission
from django.contrib.auth.base_user import AbstractBaseUser
from django.contrib.auth.base_user import BaseUserManager
from django.utils.translation import ugettext_lazy as _


class UserManager(BaseUserManager):
    def _create_user(self, email, password, **extra_fields):
        if not email:
            raise ValueError('The given email must be set')

        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_user(self, email, password=None, **extra_fields):
        return self._create_user(email, password, **extra_fields)

    def create_superuser(self, email, password, **extra_fields):
        extra_fields.setdefault('is_superuser', True)
        extra_fields.setdefault('is_staff', True)

        if extra_fields.get('is_superuser') is not True:
            raise ValueError('Superuser must have is_superuser=True')

        return self._create_user(email, password, **extra_fields)

class User(AbstractBaseUser, PermissionsMixin):
    '''
    Required columns
    '''
    groups = models.ManyToManyField(Group)
    user_permissions = models.ManyToManyField(Permission)
    is_staff = models.BooleanField(_('staff'), default=False)
    is_superuser = models.BooleanField(_('superuser'), default=False)


    email=models.EmailField(max_length=45, unique=True)
    username = models.CharField(max_length=32)
    firstName = models.CharField(max_length=32)
    lastName = models.CharField(max_length=32)    

    phoneNumber = models.CharField(max_length=11)
    gender = models.PositiveSmallIntegerField(null=False,blank=False)
    birthdate = models.DateField()
    message = models.CharField(max_length=100, blank=True)
    profilePicture = models.ImageField(upload_to="profile/", null=True, blank=True)
    emailPublic = models.BooleanField(blank=False)
    schedulePublic = models.BooleanField(default=False, blank=True)
    interestPublic = models.BooleanField(blank=False)

    objects = UserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS=['username', 'firstName', 'lastName', 'phoneNumber', 'gender', 'birthdate', 'emailPublic', 'interestPublic']

    class Meta:
        verbose_name = _('user')
        verbose_name_plural = _('users')

    def __str__(self):
        return self.username

    def get_full_name(self):
        fullName = '%s %s' % (self.firstName, self.lastName)
        return fullName

    def get_short_name(self):
        return self.firstName