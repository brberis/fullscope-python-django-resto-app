from django.utils import timezone
from rest_framework import generics, response, viewsets
from rest_framework.response import Response
from elasticsearch_dsl import Search, Q
from rest_framework.permissions import IsAuthenticated
from rest_framework import permissions, status
from rest_framework.views import APIView
from rest_framework.decorators import api_view
from django.db import transaction
import json
from elasticsearch_dsl.response import AttrDict


from django.shortcuts import render
from django.contrib.auth.models import User

from . import serializers

from events import models as event_models
from services import models as service_models
from contacts import models as contact_models
from datetime import datetime, timedelta

one_week_ago = datetime.now() - timedelta(weeks=1)

class AttrDictEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, AttrDict):
            return dict(obj)
        return json.JSONEncoder.default(self, obj)


class Profile(generics.RetrieveAPIView):
    permission_classes = (IsAuthenticated,)
    serializer_class = serializers.UserSerializer

    def get_object(self):
        return self.request.user

class RegisterView(APIView):
    permission_classes = (permissions.AllowAny,)

    def post(self, request):
        try:
            data = request.data

            first_name = data['first_name']
            last_name = data['last_name']
            username = data['username']
            password = data['password']
            re_password = data['re_password']

            if password == re_password:
                if len(password) >= 8:
                    if not User.objects.filter(username=username).exists():
                        user = User.objects.create_user(
                            first_name=first_name,
                            last_name=last_name,
                            username=username,
                            password=password,
                        )
                        user.save()

                        if User.objects.filter(username=username).exists():
                            return Response(
                                {'error': 'Account created successfully'},
                                status=status.HTTP_201_CREATED
                            )
                        else:
                            return Response(
                                {'error': 'Something went wrong while trying to create account'},
                                status=status.HTTP_500_INTERNAL_SERVER_ERROR
                            )
                    else:
                        return Response(
                            {'error': 'Username already exists'},
                            status=status.HTTP_400_BAD_REQUEST
                        )
                else:
                    return Response(
                        {'error': 'Password must be at least 8 characters long'},
                        status=status.HTTP_400_BAD_REQUEST
                    )
            else:
                return Response(
                    {'error': 'Passwords do not match'},
                    status=status.HTTP_400_BAD_REQUEST
                )
        except Exception as e:
            print('Server exception:', e)
            return Response(
                {'error': 'Something went wrong while trying to register account'},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )


class ContactSearchView(APIView):

    def get(self, request):
        query = request.query_params.get('query')
        s = contact_models.PersonDocument.search().query(
            'bool',
            should=[
                Q('match_phrase_prefix', first_name=query),
                Q('match_phrase_prefix', last_name=query)
            ])        
        response = s.execute()
        
        ## this line add the id and create a dict with first_name and last_name
        results = [{'id': hit.meta.id, **hit.to_dict()} for hit in response.hits]
        return Response(results)

class ContactViewSet(viewsets.ModelViewSet):
    queryset = contact_models.Person.objects.all()
    serializer_class = serializers.PersonSerializer

    def create(self, request, *args, **kwargs):
        with transaction.atomic():
            print(request.data)
            serializer = self.get_serializer(data=request.data)
            serializer.is_valid(raise_exception=True)
            print("ERROR", serializer.errors)
            self.perform_create(serializer)
            headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)
    
    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)



class LoadUserView(APIView):
    def get(self, request, format=None):
        try:
            user = request.user
            user = serializers.UserSerializer(user)

            return Response(
                {'user': user.data},
                status=status.HTTP_200_OK
            )
        except Exception as e:
            print('Server exception:', e)
            return Response(
                {'error': 'Something went wrong while trying to load user'},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )


class EventCatViewSet(viewsets.ModelViewSet):
    queryset = event_models.EventCategory.objects.all()
    serializer_class = serializers.EventCategorySerializer


@api_view(['GET', 'POST'])
def event_list(request):
    """
    Retrieve and post elements.
    """
    if request.method == 'GET':
        events = event_models.Event.objects.all()
        serializer = serializers.EventSerializer(events, many=True)
        return Response(serializer.data, content_type="application/json")

    elif request.method == 'POST':
        serializer = serializers.EventSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'PUT', 'DELETE'])
def event_detail(request, pk):
    """
    Retrieve, update or delete an element.
    """
    try:
        event = event_models.Event.objects.get(pk=pk)
    except event_models.Event.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = serializers.EventSerializer(event)
   
        return Response(serializer.data)

    elif request.method == 'PUT':
        serializer = serializers.EventSerializer(event, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        event.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class ServiceTypeViewSet(viewsets.ModelViewSet):
    queryset = service_models.Type.objects.all()
    serializer_class = serializers.ServiceTypeSerializer

@api_view(['GET', 'POST'])
def service_list(request):
    """All or Nothing"""
    with transaction.atomic():
        """
        Retrieve and post elements.
        """
        if request.method == 'GET':
            services = service_models.Service.objects.all()
            serializer = serializers.ServiceSerializer(services, many=True)
            return Response(serializer.data, content_type="application/json")

        elif request.method == 'POST':
            serializer = serializers.ServiceSerializer(data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'PUT', 'DELETE'])
def service_detail(request, pk):
    """
    Retrieve, update or delete an element.
    """
    try:
        service = service_models.Service.objects.get(pk=pk)
    except service_models.Service.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = serializers.ServiceSerializer(service)
   
        return Response(serializer.data)

    elif request.method == 'PUT':
        serializer = serializers.ServiceSerializer(service, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        service.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

class ServiceViewSet(viewsets.ModelViewSet):
    queryset = service_models.Service.objects.all().filter(event__event_date__gte=one_week_ago).order_by('event__event_date')
    serializer_class = serializers.ServiceSerializer

    def create(self, request, *args, **kwargs):
        with transaction.atomic():
            print(request.data)
            serializer = self.get_serializer(data=request.data)
            serializer.is_valid(raise_exception=True)
            print("ERROR", serializer.errors)
            self.perform_create(serializer)
            headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)
    
    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)


