''' Custom user model '''
from django.db import models
from django.contrib.auth.models import PermissionsMixin
from django.contrib.auth.models import Group
from django.contrib.auth.models import Permission
from django.contrib.auth.base_user import AbstractBaseUser
from django.contrib.auth.base_user import BaseUserManager
from django.utils.translation import ugettext_lazy as _
from django.utils import timezone


class UserManager(BaseUserManager):
    ''' Custom user manager '''

    def _create_user(self, email, password, **extra_fields):
        if not email:
            raise ValueError('The given email must be set')

        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_user(self, email, password=None, **extra_fields):
        ''' create user '''
        return self._create_user(email, password, **extra_fields)

    def create_superuser(self, email, password, **extra_fields):
        ''' create superuser '''
        extra_fields.setdefault('is_superuser', True)
        extra_fields.setdefault('is_staff', True)

        if extra_fields.get('is_superuser') is not True:
            raise ValueError('Superuser must have is_superuser=True')

        return self._create_user(email, password, **extra_fields)


class User(AbstractBaseUser, PermissionsMixin):
    ''' Custom user model '''
    groups = models.ManyToManyField(Group)
    user_permissions = models.ManyToManyField(Permission)
    is_staff = models.BooleanField(_('staff'), default=False)
    is_superuser = models.BooleanField(_('superuser'), default=False)

    email = models.EmailField(max_length=45, unique=True)
    username = models.CharField(max_length=32, default='ADMIN')
    first_name = models.CharField(max_length=32, default='FN')
    last_name = models.CharField(max_length=32, default='LN')

    phone_number = models.CharField(max_length=13, default='000-0000-0000')
    gender = models.BooleanField(default=True)
    birthdate = models.DateField(default=timezone.now)
    introduction = models.CharField(max_length=200, blank=True)
    profile_picture = models.ImageField(
        upload_to='profile/', null=True, blank=True)
    is_email_public = models.BooleanField(default=True, blank=True)
    is_schedule_public = models.BooleanField(default=False, blank=True)
    is_interest_public = models.BooleanField(default=True, blank=True)

    objects = UserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username', 'first_name', 'last_name', 'phone_number',
                       'gender', 'birthdate']

    class Meta:
        verbose_name = _('user')
        verbose_name_plural = _('users')

    def __str__(self):
        return self.username

    def get_full_name(self):
        ''' get full name '''
        full_name = '%s %s' % (self.first_name, self.last_name)
        return full_name

    def get_short_name(self):
        ''' get short name '''
        return self.first_name

    def has_perm(self, perm, obj=None):
        ''' check if user has permission '''
        return True

    def has_module_perms(self, app_label):
        ''' check if user has module permission '''
        return True
