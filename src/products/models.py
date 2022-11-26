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
    slug=models.SlugField(
        verbose_name=('slug'),
        max_length=255,
        db_index=True,
        blank=True,
        help_text=(
            'Used in the URL. If changed, the URL will change. '
            'Clear it to have it re-created automatically.')),
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
    order = models.PositiveSmallIntegerField(('Order'), default=99, null=True)

    objects = ItemManager()

    def __str__(self):
        return self.title 

    class Meta:
        ordering = ['order']
        verbose_name = ('Product')
        verbose_name_plural = ('Products')


