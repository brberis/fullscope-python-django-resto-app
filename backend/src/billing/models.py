from django.db import models
from contacts.models import Person
from django.db.models.signals import pre_save
from .utils import unique_code_id_generator

INVOICE_STATUS = [('Draft' , ('Draft')),
                    ('Unpaid', ('Unpaid')),
                    ('Partially Paid', ('Partially Paid')),
                    ('Paid', ('Paid')),
                    ('Declined', ('Declined')),
                    ('Deleted', ('Deleted')),
                    ('Void', ('Void'))
                    ]


class Order(models.Model):
    code = models.CharField(max_length=100, null=True, blank=True)
    date = models.DateField(auto_now_add=True)
    client = models.ForeignKey(Person, related_name='Client', on_delete=models.CASCADE )
    amount = models.DecimalField(default=0, max_digits=12, decimal_places=2)
    special_discount = models.CharField(max_length=250, null=True, blank=True)
    notes = models.TextField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.code


class PaymentType(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name


class Invoice(models.Model):

    number = models.IntegerField(null=False, default=0)
    order = models.ForeignKey(Order, related_name='invoice', on_delete=models.CASCADE)
    tax = models.DecimalField(default=0, max_digits=2, decimal_places=2)
    date = models.DateField(auto_now_add=True)
    due_date = models.DateField(auto_now_add=True)
    status = models.CharField(choices=INVOICE_STATUS, default='Unpaid', max_length=50)
    updated_at = models.DateTimeField(auto_now=True)
    created_at = models.DateTimeField(auto_now_add=True)


    def __str__(self):
        return self.number


class InvoiceItem(models.Model):

    invoice = models.ForeignKey(Invoice, related_name='item', on_delete=models.CASCADE)
    code =  models.CharField(max_length=100, null=False, blank=True)
    description = models.CharField(max_length=100)
    unit_price = models.DecimalField(default=0, max_digits=12, decimal_places=2)
    qty = models.IntegerField(default = 1)
    discount = models.DecimalField(default=0, max_digits=12, decimal_places=2)

    def __str__(self):
        return self.code


class Payment(models.Model):
    invoice = models.ForeignKey(Invoice, related_name='payment', on_delete=models.CASCADE)
    amount = models.DecimalField(default=0, max_digits=12, decimal_places=2)
    payment_method = models.ForeignKey(PaymentType, related_name='payment', on_delete=models.PROTECT)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.amount


def pre_save_receiver(sender, instance, *args, **kwargs):
    if not instance.code:
        code = unique_code_id_generator(instance)
        instance.code = code

pre_save.connect(pre_save_receiver, sender=Order)