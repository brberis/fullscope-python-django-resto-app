
from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from rest_framework import routers
from api.views import ItemViewSet

# Routers provide an easy way of automatically determining the URL conf.
router = routers.DefaultRouter()
router.register(r'products', ItemViewSet)

urlpatterns = [
    path('signpage/', include('signpage.urls')),
    path('admin/', admin.site.urls),
    path('', include(router.urls)),
    path('api-auth/', include('rest_framework.urls'))

] + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
