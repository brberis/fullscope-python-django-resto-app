from django.conf import settings
from django.contrib import admin
from django.urls import include, path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView, TokenVerifyView
from . import views

admin.autodiscover()


urlpatterns = [
    path('api-v1/token/', TokenObtainPairView.as_view()),
    path('api-v1/token/refresh/', TokenRefreshView.as_view()),
    path('api-v1/token/verify/', TokenVerifyView.as_view()),
    path('api-v1/account/register', views.RegisterView.as_view()),
    path('api-v1/account/user', views.LoadUserView.as_view()),
    path('api-v1/contacts', views.ServiceViewSet.as_view({'get': 'list'})),
    path('api-v1/events', views.event_list),
    path('api-v1/events/<int:pk>/', views.event_detail),
    path('api-v1/event-categories', views.EventCatViewSet.as_view({'get': 'list'}), name='event-list'),
    path('api-v1/services', views.ServiceViewSet.as_view({'get': 'list'})),
    path('api-v1/services/<int:pk>/', views.service_detail),
    path('api-v1/service-types', views.ServiceTypeViewSet.as_view({'get': 'list'}), name='service-list'),
    path('api-v1/contact-search', views.ContactSearchView.as_view(), name='search'),

    path("admin/", admin.site.urls),
    path('signpage/', include('signpage.urls')),
]

urlpatterns += [
    path("api-auth/", include('rest_framework.urls'))
]

if not settings.ON_SERVER:
    import debug_toolbar
    urlpatterns = [
        path('__debug__/', include(debug_toolbar.urls)),
    ] + urlpatterns
