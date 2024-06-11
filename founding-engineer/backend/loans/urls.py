from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .api import CustomerViewSet, LoanOfferViewSet

router = DefaultRouter()
router.register('customers', CustomerViewSet)
router.register('loanoffers', LoanOfferViewSet)

urlpatterns = [
    path('', include(router.urls))
]