from django.db import models
from events.models import Event
from products.models import Item
from contacts.models import Person
from billing.models import Order

STATUS = (
    ('Unconfirmed', 'Unconfirmed'),
    ('Confirmed', 'Confirmed'),
    ('Suspended', 'Suspended'),
    ('Finished', 'Finished'),
    ('Cancelled', 'Cancelled')
)

class Type(models.Model):
    name = models.CharField(max_length=150, verbose_name=('Name'), null=True, blank=True)

    def __str__(self):
        return self.name

class Service(models.Model):
    title = models.CharField(max_length=250)
    location = models.CharField(max_length=250, blank=True, null=True)
    description = models.TextField(default='', blank=True)
    type = models.ForeignKey(Type, related_name='service_type', on_delete=models.PROTECT )
    event = models.ForeignKey(Event, on_delete=models.CASCADE)
    status = models.CharField(choices=STATUS, default='Active', max_length=50)
    number_of_guests = models.IntegerField(default=10, null=False)
    products = models.ManyToManyField(Item, blank=True, null=True)
    team = models.ManyToManyField(Person, blank=True, null=True)
    order = models.ForeignKey(Order, blank=True, null=True, on_delete=models.CASCADE)

    def __str__(self):
        return self.title 