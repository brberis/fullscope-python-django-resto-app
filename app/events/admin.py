from django.contrib import admin
from .models import EventCategory, Event

@admin.register(EventCategory)
class EventCategoryAdmin(admin.ModelAdmin):
    pass

@admin.register(Event)
class EventAdmin(admin.ModelAdmin):
    pass