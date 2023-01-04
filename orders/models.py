from django.db import models
from contacts.models import Person
from django.db.models.signals import pre_save
from utils.code_generator import unique_code_id_generator

class Order(models.Model):
    code = models.CharField(max_length=100, null=True, blank=True)
    date = models.DateField(auto_now_add=True)
    client = models.ForeignKey(Person, related_name='order_client', on_delete=models.CASCADE )
    special_discount = models.CharField(max_length=250, null=True, blank=True)
    notes = models.TextField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.code

class OrderItem(models.Model):

    order = models.ForeignKey(Order, related_name='order_item', on_delete=models.CASCADE)
    code =  models.CharField(max_length=100, null=False, blank=True)
    description = models.CharField(max_length=100)
    unit_price = models.DecimalField(default=0, max_digits=12, decimal_places=2)
    qty = models.IntegerField(default = 1)
    discount = models.DecimalField(default=0, max_digits=12, decimal_places=2)

    def __str__(self):
        return self.code


def pre_save_receiver(sender, instance, *args, **kwargs):
    if not instance.code:
        code = unique_code_id_generator(instance)
        instance.code = code

pre_save.connect(pre_save_receiver, sender=Order)