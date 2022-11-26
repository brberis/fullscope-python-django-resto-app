from django.contrib import admin
from .models import Person, Company

@admin.register(Person)
class PersonAdmin(admin.ModelAdmin):
    pass

@admin.register(Company)
class CompanyAdmin(admin.ModelAdmin):
    pass

