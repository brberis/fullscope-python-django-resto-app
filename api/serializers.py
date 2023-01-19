from django.conf import settings
from rest_framework.fields import DateField, TimeField
from rest_framework import serializers
from rest_framework_simplejwt import serializers as jwt_serializers
from rest_framework_simplejwt.settings import api_settings as jwt_settings
from rest_framework_simplejwt.tokens import RefreshToken

from . import models
from events import models as event_models
from services import models as service_models
from contacts import models as contact_models
from payroll import models as payroll_models

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.User
        fields = (
            "id",
            "username",
            "name",
            "email",
            "is_active",
            "date_joined",
            "last_login",
        )

## Contacts
class CompanySerializer(serializers.ModelSerializer):
    class Meta:
        model = contact_models.Company
        fields = (
            "company_code",
            "contact_type",
            "company_name",
            "email",
            "address",
            "city",
            "state",
            "zip_code",
            "phone",
            "webpage"            
        )

class PersonSerializer(serializers.ModelSerializer):
    company = CompanySerializer()
    class Meta:
        model = contact_models.Person

        fields = (
            "first_name",
            "last_name",
            "phone",
            "email",
            "company",
            "address",
            "city",
            "state",
            "zip_code",
            "user"
        )

    ## To create person object with nested company.
    def create(self, validated_data):
        company_data = validated_data.pop("company")
        company = CompanySerializer.create(CompanySerializer(), validated_data=company_data)
        person = contact_models.Person.objects.create(company=company, **validated_data)
        return person

## Events
class EventCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = event_models.EventCategory
        fields = "__all__"

class EventSerializer(serializers.ModelSerializer):
    class Meta:
        model = event_models.Event
        fields = (
            "id",
            "title",
            "description",
            "status",
            "category",
            "event_date",
            "start_time",
            "end_time",
            "place"
        )

##Service
class ServiceTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = service_models.Type
        fields = "__all__"

class ServiceSerializer(serializers.ModelSerializer):
    event = EventSerializer()
    class Meta:
        model = service_models.Service
        fields = "__all__"

    ## To create service object with nested event.
    def create(self, validated_data):
        event_data = validated_data.pop("event")
        event = EventSerializer.create(EventSerializer(), validated_data=event_data)
        service = service_models.Service.objects.create(event=event, **validated_data)
        return service


## Payroll
class EmployeeSerializer(serializers.ModelSerializer):
    person = PersonSerializer(read_only=True)

    class Meta:
        model = payroll_models.Employee
        fields = (
            'id', 
            'person', 
            'job_title', 
            'salary', 
            'hire_date', 
            'is_active'
        )

class PayrollPeriodSerializer(serializers.ModelSerializer):
    processed_by = EmployeeSerializer(read_only=True)
    class Meta:
        model = payroll_models.PayrollPeriod
        fields = (
            'id', 
            'start_date', 
            'end_date', 
            'processed_date', 
            'processed_by'
            )

class PaycheckSerializer(serializers.ModelSerializer):
    employee = EmployeeSerializer(read_only=True)
    payroll_period = PayrollPeriodSerializer(read_only=True)
    class Meta:
        model = payroll_models.Paycheck
        fields = (
            'id', 
            'employee', 
            'payroll_period', 
            'gross_pay', 
            'net_pay', 
            'deductions', 
            'taxes'
            )
