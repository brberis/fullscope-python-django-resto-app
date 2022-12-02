from django.contrib import admin
from .models import Category, Item, Inventory, Location

@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    pass

@admin.register(Item)
class ItemAdmin(admin.ModelAdmin):
    pass

@admin.register(Inventory)
class InventoryAdmin(admin.ModelAdmin):
    pass

@admin.register(Location)
class LocationAdmin(admin.ModelAdmin):
    pass