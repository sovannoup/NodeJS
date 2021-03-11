from django.urls import path, include
from django.contrib import admin
from django.urls import path
from rest_framework import routers
from Stripe.views import PaymentViewSet

router = routers.DefaultRouter()

router.register('payment', PaymentViewSet, basename="payment")


urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
]
