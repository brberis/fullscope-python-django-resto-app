from django.db import models


class Category(models.Model):
    name = models.CharField(max_length=150, verbose_name=('Name'))
    description = models.TextField(verbose_name=('Description'), null=True, blank=True)
    order = models.PositiveSmallIntegerField(('Order'), default=99, null=True)


    def __str__(self):
        return self.name 

    class Meta:
        verbose_name = ('Category')
        verbose_name_plural = ('Categories')
        ordering = ['order']

class ItemManager(models.Model):
    def active(self, **kwargs):
        return self.filter(active=True, **kwargs)
    def featured(self, **kwargs):
        return self.filter(is_featured=True, **kwargs)

        
class Item(models.Model):
    title=models.CharField(('Name'), max_length=250)
    item_description=models.TextField(
        verbose_name=('Item Description'), default='',
        blank=True
    )
    price = models.DecimalField(default=0, max_digits=12, decimal_places=0, verbose_name=('Price'))
    categories = models.ManyToManyField(Category,
                                         verbose_name=('Categories'),
                                         blank=True)
    active = models.BooleanField(('Active'), default=False,
                                       db_index=True)
    is_featured = models.BooleanField(('Featured'), default=False,
                                      db_index=True)
    featured_image = models.CharField(
        verbose_name=('Featured image'),
        null=True,
        blank=True,
        max_length=150)
    for_sale = models.BooleanField(verbose_name=('For Sale'), default=False)

    order = models.PositiveSmallIntegerField(('Order'), default=99, null=True)
    objects = ItemManager()

    def __str__(self):
        return self.title 

    class Meta:
        ordering = ['order']
        verbose_name = ('Product')
        verbose_name_plural = ('Products')

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


