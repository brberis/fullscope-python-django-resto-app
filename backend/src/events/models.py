from django.db import models
from contacts.models import Person

STATUS = (
    ('Open', 'Open'),
    ('Closed', 'Closed')
)

class EventCategory(models.Model):
    name = models.CharField(max_length=150, verbose_name=('Name'))
    description = models.TextField(verbose_name=('Description'), null=True, blank=True)
    order = models.PositiveSmallIntegerField(('Order'), default=99, null=True)


    def __str__(self):
        return self.name 

    class Meta:
        verbose_name = ('Category')
        verbose_name_plural = ('Categories')
        ordering = ['order']


class Event(models.Model):
    title=models.CharField(max_length=250)
    description=models.TextField(default='', blank=True)
    category = models.ForeignKey(EventCategory, on_delete=models.CASCADE)
    status = models.CharField(choices=STATUS, default='Open', max_length=50)
    event_date = models.DateField()
    start_time = models.TimeField()
    end_time = models.TimeField
    contact = models.ForeignKey(Person, null=True, on_delete=models.SET_NULL)
    place = models.TextField(null=True)

    def __str__(self):
        return self.title 
