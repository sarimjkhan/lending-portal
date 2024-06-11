from rest_framework import viewsets, status
from rest_framework.response import Response
from .models import Customer, LoanOffer
from .serializers import CustomerSerializer, LoanOfferSerializer

class CustomerViewSet(viewsets.ModelViewSet):
    queryset = Customer.objects.all()
    serializer_class = CustomerSerializer

class LoanOfferViewSet(viewsets.ModelViewSet):
    queryset = LoanOffer.objects.all()
    serializer_class = LoanOfferSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        loan_offer = serializer.instance
        monthly_payment = loan_offer.calculate_monthly_payment()
        response_data = serializer.data
        response_data['monthly_payment'] = str(monthly_payment)
        return Response(response_data, status=status.HTTP_201_CREATED)