from django.contrib import admin
from .models import Quote, QuoteItem, QuoteOrder

@admin.register(Quote)
class QuoteAdmin(admin.ModelAdmin):
    pass

@admin.register(QuoteItem)
class QuoteItemAdmin(admin.ModelAdmin):
    pass

