from django.contrib import admin
from .models import Unit, Formula, Recipe

@admin.register(Unit)
class UnitAdmin(admin.ModelAdmin):
    pass

@admin.register(Formula)
class FormulaAdmin(admin.ModelAdmin):
    pass

@admin.register(Recipe)
class RecipeAdmin(admin.ModelAdmin):
    pass
