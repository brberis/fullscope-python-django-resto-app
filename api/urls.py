from django.conf import settings
from django.contrib import admin
from django.urls import include, path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView, TokenVerifyView
from .views import RegisterView, LoadUserView

from . import views
from . import jwt_views

admin.autodiscover()


urlpatterns = [
    path('api/token/', TokenObtainPairView.as_view()),
    path('api/token/refresh/', TokenRefreshView.as_view()),
    path('api/token/verify/', TokenVerifyView.as_view()),
    path('api/account/register', RegisterView.as_view()),
    path('api/account/user', LoadUserView.as_view()),
    # path("me/", views.Profile.as_view(), name="me"),
    # path("token/", jwt_views.Login.as_view(), name="token"),
    # path(
    #     "token/refresh/", TokenRefreshView.as_view(),
    #     name="token-refresh"
    # ),
    path("token/logout/", jwt_views.Logout.as_view(), name="logout"),
    path("ping/", views.Ping.as_view(), name="ping"),
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
