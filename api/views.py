from django.utils import timezone
from rest_framework import generics, response
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import permissions, status
from rest_framework.views import APIView
from django.shortcuts import render
from django.contrib.auth.models import User

from . import serializers


class Profile(generics.RetrieveAPIView):
    permission_classes = (IsAuthenticated,)
    serializer_class = serializers.User

    def get_object(self):
        return self.request.user


class Ping(generics.GenericAPIView):
    permission_classes = (IsAuthenticated,)

    def get(self, *args, **kwargs):
        return Response({'now': timezone.now().isoformat()})


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
            user = serializers.User(user)

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


