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
    company = CompanySerializer(read_only=True)
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
            "contact",
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
