from django.contrib import admin
from .models import Service, Type

@admin.register(Service)
class ServiceAdmin(admin.ModelAdmin):
    pass

@admin.register(Type)
class TypeAdmin(admin.ModelAdmin):
    pass


