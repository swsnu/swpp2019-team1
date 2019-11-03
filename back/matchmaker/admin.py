'''
matchmaker admin
'''
from django.contrib import admin
from .models import Category, Match

admin.site.register(Category)
admin.site.register(Match)
