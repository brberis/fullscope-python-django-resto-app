from django.conf import settings
from rest_framework import serializers
from rest_framework_simplejwt import serializers as jwt_serializers
from rest_framework_simplejwt.settings import api_settings as jwt_settings
from rest_framework_simplejwt.tokens import RefreshToken

from . import models
from app.events import models as event_models

class User(serializers.ModelSerializer):
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

class Event(serializers.ModelSerializer):
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
            "contact",
            "place"

        )

