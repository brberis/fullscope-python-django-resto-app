from django.contrib import admin
from .models import Order, PaymentType, Invoice, InvoiceItem

@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    pass

@admin.register(PaymentType)
class PaymentTypeAdmin(admin.ModelAdmin):
    pass

@admin.register(Invoice)
class InvoiceAdmin(admin.ModelAdmin):
    pass

@admin.register(InvoiceItem)
class InvoiceItemAdmin(admin.ModelAdmin):
    pass