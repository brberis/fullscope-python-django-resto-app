from rest_framework import serializers
from products.models import Item

class ItemSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Item
        fields = ['__all__']