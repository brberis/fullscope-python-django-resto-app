from django.conf import settings
from django.contrib import admin
from django.urls import include, path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView, TokenVerifyView
from . import views

admin.autodiscover()


urlpatterns = [
    path('api/token/', TokenObtainPairView.as_view()),
    path('api/token/refresh/', TokenRefreshView.as_view()),
    path('api/token/verify/', TokenVerifyView.as_view()),
    path('api/account/register', views.RegisterView.as_view()),
    path('api/account/user', views.LoadUserView.as_view()),
    path('api/events', views.event_list),
    path('api/events/<int:pk>/', views.event_detail),
    path('api/event-categories', views.EventCatViewSet.as_view({'get': 'list'}), name='event-list'),
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
