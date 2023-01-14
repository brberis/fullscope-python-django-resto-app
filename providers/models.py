from django.db import models
from contacts.models import Person, Company

class Provider(models.Model):
    company = models.ForeignKey(Company, null=True, on_delete=models.SET_NULL)
    contact = models.ForeignKey(Person, null=True, on_delete=models.SET_NULL)
    notes = models.TextField(default='', blank=True)
    active = models.BooleanField(default=True)

    def __str__(self):
        return self.company.company_name 