'''
matchmaker admin
'''
from django.contrib import admin
from .models import Category, Match, Participation

admin.site.register(Category)
admin.site.register(Match)

admin.site.register(Participation)
