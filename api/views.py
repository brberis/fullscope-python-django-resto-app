from django.utils import timezone
from rest_framework import generics, response, viewsets
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import permissions, status
from rest_framework.views import APIView
from rest_framework.decorators import api_view
from django.db import transaction



from django.shortcuts import render
from django.contrib.auth.models import User

from . import serializers

from events import models as event_models
from services import models as service_models



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
        serializer = serializers.Event(events, many=True)
        return Response(serializer.data, content_type="application/json")

    elif request.method == 'POST':
        serializer = serializers.Event(data=request.data)
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
    queryset = service_models.Service.objects.all()
    serializer_class = serializers.ServiceSerializer

    def create(self, request, *args, **kwargs):
        with transaction.atomic():
            serializer = self.get_serializer(data=request.data)
            serializer.is_valid(raise_exception=True)
            self.perform_create(serializer)
            headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)


