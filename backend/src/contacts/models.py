from django.db import models
from django.contrib.auth.models import User, Group
from django.conf import settings

CONTACT_TYPE = (
    ('Customer', 'Customer'),
    ('Vendor', 'Vendor')
)

class Company(models.Model):

    company_code = models.CharField(max_length=10, verbose_name=('Company Code'), null=True, blank=True)
    contact_type = models.CharField(choices=CONTACT_TYPE, default='Costumer', max_length=50)
    company_name = models.CharField(max_length=100, verbose_name=('Company Name'))
    email = models.EmailField(max_length=70, null=False, blank=True)
    address = models.CharField(max_length=200, verbose_name=('Address'), null=False, blank=True)
    city = models.CharField(max_length=70, verbose_name=('City'), null=False, blank=True)
    state = models.CharField(max_length=200, verbose_name=('State'), null=False, blank=True)
    zip_code = models.CharField(max_length=200, verbose_name=('Zip Code'), null=False, blank=True)
    phone = models.CharField(verbose_name=('Phone Number') , max_length=40, null=False, blank=True) # validators should be a list
    webpage = models.CharField(max_length=200, verbose_name=('Webpage'), null=False, blank=True)

    def __str__(self):
        return self.company_name


class Person(models.Model):

    first_name = models.CharField(max_length=100, verbose_name=('Name'))
    last_name = models.CharField(max_length=100, verbose_name=('Last Name'), null=False, blank=True)
    phone = models.CharField(verbose_name=('Phone Number') , max_length=40, null=False, blank=True) # validators should be a list
    email = models.EmailField(max_length=70, null=False, blank=True)
    company = models.ForeignKey(Company, verbose_name=('Company'), null=True, blank=True, related_name='person', on_delete=models.SET_NULL)
    user = models.OneToOneField(
        getattr(settings, 'AUTH_USER_MODEL', 'auth.User'),
        null=True, blank=True, related_name='persons', on_delete=models.CASCADE)

    def __str__(self):
        return self.last_name