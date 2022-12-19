from django.conf import settings
from django.contrib import admin
from django.urls import include, path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView, TokenVerifyView
from .views import RegisterView, LoadUserView, EventViewSet

from . import views

admin.autodiscover()


urlpatterns = [
    path('api/token/', TokenObtainPairView.as_view()),
    path('api/token/refresh/', TokenRefreshView.as_view()),
    path('api/token/verify/', TokenVerifyView.as_view()),
    path('api/account/register', RegisterView.as_view()),
    path('api/account/user', LoadUserView.as_view()),
    path('api/events', EventViewSet.as_view({'get': 'list'}), name='event-list'),
    path('events/<int:pk>/', EventViewSet.as_view({'get': 'retrieve'}), name='event-detail'),
    path("admin/", admin.site.urls),
    path('signpage/', include('app.signpage.urls')),
]

urlpatterns += [
    path("api-auth/", include('rest_framework.urls'))
]

if not settings.ON_SERVER:
    import debug_toolbar
    urlpatterns = [
        path('__debug__/', include(debug_toolbar.urls)),
    ] + urlpatterns
