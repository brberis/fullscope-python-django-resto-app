from django.contrib import admin
from .models import Catering

@admin.register(Catering)
class CateringAdmin(admin.ModelAdmin):
    pass


