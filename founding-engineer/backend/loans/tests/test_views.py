import pytest
from rest_framework.test import APIClient
from loans.models import Customer, LoanOffer
from django.urls import reverse
from rest_framework import status
from decimal import Decimal

@pytest.mark.django_db
def test_customer_list():
    client = APIClient()
    Customer.objects.create(name="Sarim", email="sarim@gmail.com")
    url = reverse('customer-list')
    response = client.get(url)
    assert response.status_code == status.HTTP_200_OK
    assert len(response.data) == 1

@pytest.mark.django_db
def test_create_customer():
    client = APIClient()
    url = reverse('customer-list')
    data = {'name': 'Sarim', 'email': 'sarim@gmail.com'}
    response = client.post(url, data, format='json')
    assert response.status_code == status.HTTP_201_CREATED
    assert Customer.objects.count() == 1
    assert Customer.objects.get().name == 'Sarim'

@pytest.mark.django_db
def test_view_loan_offers():
    client = APIClient()
    customer = Customer.objects.create(name="Sarim", email="sarim@gmail.com")
    LoanOffer.objects.create(customer=customer, amount=1000.00, interest_rate=5.0, term=12)
    url = reverse('loanoffer-list')
    response = client.get(url)
    assert response.status_code == status.HTTP_200_OK
    assert len(response.data) == 1

@pytest.mark.django_db
def test_create_loan_offer():
    customer = Customer.objects.create(name="Sarim", email="sarim@gmail.com")
   
    url = reverse('loanoffer-list')
    data = {
        'customer': customer.id,
        'amount': Decimal('2000.00'),
        'interest_rate': Decimal('5.0'),
        'term': 24
    }

    client = APIClient()
    response = client.post(url, data, format='json')

    print("Jani customer.id: ", customer.id)

    if response.status_code != status.HTTP_201_CREATED:
        print("Failed to create LoanOffer:", response.data)  # Debug output

    assert response.status_code == status.HTTP_201_CREATED, "Failed to create LoanOffer: " + str(response.data)
    assert LoanOffer.objects.count() == 1, "LoanOffer count mismatch"
    loan_offer = LoanOffer.objects.first()
    assert loan_offer.customer == customer
    assert loan_offer.amount == Decimal('2000.00')
