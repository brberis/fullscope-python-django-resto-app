from django.db import models
from inventory.models import Item

UNIT_TYPE = (
    ('Oz', 'Oz'),
    ('Qts', 'Qts'),
    ('ml', 'ml'),
)


class Unit(models.Model):
    name = models.CharField(max_length=150, verbose_name=('Name'), null=True, blank=True)
    unit_type = models.CharField(verbose_name=('Unit Type'), default = 'Units',max_length=30, choices=UNIT_TYPE)
    # value = models.IntegerField(default=0, verbose_name=_('Value'))
    
    def __str__(self):
        return self.name

class Formula(models.Model):
    product = models.ForeignKey(Item, verbose_name=('Item'), related_name='formula_product', on_delete=models.CASCADE)
    ingredient = models.ForeignKey(Item, verbose_name=('Ingredient'), null=True, blank=True, related_name='formula_ingredient', on_delete=models.SET_NULL)
    unit = models.ForeignKey(Unit, verbose_name=('Unit'), related_name='item', null=True, blank=True, on_delete=models.SET_NULL)
    value = models.IntegerField(default=0, verbose_name=('Value'))

    def __str__(self):
        return self.name

class Recipe(models.Model):
    name = models.CharField(max_length=150, verbose_name=('Name'), null=True, blank=True)
    product = models.ForeignKey(Item, verbose_name=('Item'), related_name='recipe', on_delete=models.CASCADE)
    description = models.TextField(verbose_name=('Description'), null=True, blank=True)

    def __str__(self):
        return self.name
