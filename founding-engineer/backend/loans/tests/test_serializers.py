import pytest
from loans.serializers import CustomerSerializer, LoanOfferSerializer
from loans.models import Customer, LoanOffer
from decimal import Decimal

@pytest.mark.django_db
def test_customer_serializer_valid_data():
    customer_data = {
        'name': 'Sarim',
        'email': 'sarim@gmail.com'
    }
    serializer = CustomerSerializer(data=customer_data)
    assert serializer.is_valid(), "Serializer should be valid"

    customer = serializer.save()

    assert customer.name == customer_data['name']
    assert customer.email == customer_data['email']
    assert Customer.objects.count() == 1, "should have atleast 1 customer"

@pytest.mark.django_db
def test_customer_serializer_invalid_data():
    #not adding the 'name'
    customer_data = {
        'email': 'sarim@invalid.com'
    }
    serializer = CustomerSerializer(data=customer_data)

    assert not serializer.is_valid(), "Serializer should be invalid"
    assert 'name' in serializer.errors, "Should have an error for the missing name"

@pytest.mark.django_db
def test_loan_offer_serializer_valid_data():
    customer = Customer.objects.create(name='Sarim', email='sarim@gmail.com')
    loan_offer_data = {
        'customer': customer.id,
        'interest_rate': Decimal('5.5'),
        'term': 12,
        'amount': Decimal('1000.50')
    }

    serializer = LoanOfferSerializer(data=loan_offer_data)
    assert serializer.is_valid(), "Serializer should be valid"
    loan_offer = serializer.save()

    assert loan_offer.customer == customer
    assert loan_offer.amount == loan_offer_data['amount']
    assert loan_offer.interest_rate == loan_offer_data['interest_rate']
    assert loan_offer.term == loan_offer_data['term']
    assert LoanOffer.objects.count() == 1 , "shoould have atleast 1 loan offer"

@pytest.mark.django_db
def test_loan_offer_serializer_invalid_data():
    customer = Customer.objects.create(name='Sarim', email='sarim@gmail.com')
    loan_offer_data = {
        'customer': customer.id,
        'interest_rate': Decimal('5.5'),
        'term': 12,
        'amount': Decimal('-1000.50')
    }

    serializer = LoanOfferSerializer(data=loan_offer_data)
    assert not serializer.is_valid(), "Serializer should not be valid"
    assert 'amount' in serializer.errors, "Should have an error for the amount"


