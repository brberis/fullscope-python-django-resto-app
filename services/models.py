from django.db import models
from events.models import Event
from products.models import Item
from contacts.models import Person
from billing.models import Order
from payroll.models import Employee

STATUS = (
    ('Unconfirmed', 'Unconfirmed'),
    ('Confirmed', 'Confirmed'),
    ('Suspended', 'Suspended'),
    ('Finished', 'Finished'),
    ('Cancelled', 'Cancelled')
)

CATEGORIES = (
    ('Catering', 'Catering'),
    ('Other Services', 'Other Service'),
)

class Type(models.Model):
    name = models.CharField(max_length=150, verbose_name=('Name'), null=True, blank=True)

    def __str__(self):
        return self.name

class Service(models.Model):
    title = models.CharField(max_length=250)
    contact = models.ForeignKey(Person, null=True, on_delete=models.SET_NULL)
    location = models.CharField(max_length=250, blank=True, null=True)
    description = models.TextField(default='', blank=True)
    type = models.CharField(choices=CATEGORIES, default='Catering', max_length=50)
    event = models.ForeignKey(Event, on_delete=models.CASCADE)
    status = models.CharField(choices=STATUS, default='Unconfirmed', max_length=50)
    number_of_guests = models.IntegerField(default=10, null=True, blank=True)
    products = models.ManyToManyField(Item, blank=True, null=True)
    team = models.ManyToManyField(Employee, blank=True, null=True)
    order = models.ForeignKey(Order, blank=True, null=True, on_delete=models.CASCADE)

    def __str__(self):
        return self.title 


