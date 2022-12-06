from django.contrib import admin
from .models import Inventory, Location

@admin.register(Inventory)
class InventoryAdmin(admin.ModelAdmin):
    pass

@admin.register(Location)
class LocationAdmin(admin.ModelAdmin):
    pass