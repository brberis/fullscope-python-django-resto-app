from rest_framework import serializers
from inventory.models import Inventory, Location
from products.models import Category, Item
from production.models import Unit, Recipe, Formula 
from contacts.models import Company, Person
from services.models import Type, Service
from billing.models import Order, PaymentType, Invoice, InvoiceItem
from events.models import EventCategory, Event

## Inventory ##
class InventorySerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Inventory
        fields = ['__all__']

class CategorySerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Category
        fields = ['__all__']

class LocationSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Location
        fields = ['__all__']

## Products ##
class CategorySerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Category
        fields = ['__all__']

class ItemSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Item
        fields = ['__all__']

## Production ##
class UnitSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Unit
        fields = ['__all__']

class RecipeSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Recipe
        fields = ['__all__']

class FormulaSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Formula
        fields = ['__all__']

## Contacts ##
class CompanySerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Company
        fields = ['__all__']

class PersonSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Person
        fields = ['__all__']       

## Services ##
class TypeSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Type
        fields = ['__all__']

class ServiceSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Service
        fields = ['__all__']

## Billing ##
class OrderSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Order
        fields = ['__all__']

class PaymentTypeSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = PaymentType
        fields = ['__all__']

class InvoiceSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Invoice
        fields = ['__all__']

class InvoiceItemSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = InvoiceItem
        fields = ['__all__']

## Events ##
class EventCategorySerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = EventCategory
        fields = ['__all__']

class EventSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Event
        fields = ['__all__']