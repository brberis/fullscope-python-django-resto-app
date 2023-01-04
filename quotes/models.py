from django.db import models
from contacts.models import Person
from django.db.models.signals import pre_save
from utils.code_generator import unique_code_id_generator
from orders.models import Order

QUOTE_STATUS = [('Draft' , ('Draft')),
                    ('Sent', ('Sent')),
                    ('Approved', ('Approved')),
                    ('Disapproved', ('Disapproved')),
                    ('Cancelled', ('Cancelled'))
                    ]


class Quote(models.Model):

    number = models.IntegerField(null=False, default=0)
    client = models.ForeignKey(Person, related_name='quote_client', on_delete=models.CASCADE )
    tax = models.DecimalField(default=0, max_digits=2, decimal_places=2)
    date = models.DateField(auto_now_add=True)
    due_date = models.DateField(auto_now_add=True)
    status = models.CharField(choices=QUOTE_STATUS, default='Draft', max_length=50)
    notes = models.TextField(null=True, blank=True)
    updated_at = models.DateTimeField(auto_now=True)
    created_at = models.DateTimeField(auto_now_add=True)


    def __str__(self):
        return self.number


class QuoteItem(models.Model):

    quote = models.ForeignKey(Quote, related_name='quote_item', on_delete=models.CASCADE)
    code =  models.CharField(max_length=100, null=False, blank=True)
    description = models.CharField(max_length=100)
    unit_price = models.DecimalField(default=0, max_digits=12, decimal_places=2)
    qty = models.IntegerField(default = 1)
    discount = models.DecimalField(default=0, max_digits=12, decimal_places=2)

    def __str__(self):
        return self.code



class QuoteOrder(models.Model):

    quote = models.ForeignKey(Quote, related_name='quote_order', on_delete=models.CASCADE )
    order = models.ForeignKey(Order, related_name='order_quote', on_delete=models.CASCADE )


def pre_save_receiver(sender, instance, *args, **kwargs):
    if not instance.code:
        code = unique_code_id_generator(instance)
        instance.code = code

pre_save.connect(pre_save_receiver, sender=Order)