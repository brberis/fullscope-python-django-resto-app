from django.db import models
from app.products.models import Item

class Location(models.Model):

    name = models.CharField(max_length=100, verbose_name=('Name'))

    def __str__(self):
        return self.name


class Inventory(models.Model):

    location = models.ForeignKey(Location, verbose_name=('Location'), null=True, blank=True, related_name='inventory', on_delete=models.SET_NULL)
    item = models.ForeignKey(Item, verbose_name=('Item'), related_name='inventory', on_delete=models.CASCADE)
    stock_level = models.IntegerField(verbose_name=('Stock Level'), default = 0, help_text=('Balance'))
    available_status = models.BooleanField(verbose_name=('Available Status'), default = True)
    availability_date = models.DateTimeField(verbose_name = ('Availability Date'), null=True, blank=True, help_text=('The date on which the inventory is expected to be available.'))
    backorder_level = models.IntegerField(verbose_name=('Backorder Level'), default = 1, help_text=('The number of items that may be backordered.')) 
    preorder_level = models.IntegerField(verbose_name=('Preorder Level'), default = 1, help_text=('The number of items that may be preorderable.')) 
    stock_thresh = models.IntegerField(verbose_name=('Stock Thresh'), default = 0, help_text=('If the stock_level value dips below this value, a ThresholdReached event is sent.'))
    backorder_thresh = models.IntegerField(verbose_name=('Backorder Thresh'), default = 0, help_text=('If the backorder_level value dips below this value, a ThresholdReached event is sent.'))
    preorder_thresh = models.IntegerField(verbose_name=('Preorder Thresh'), default = 0, help_text=('If the preorder_level value dips below this value, a ThresholdReached event is sent.'))
    updated_at = models.DateTimeField(auto_now=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.item.name


