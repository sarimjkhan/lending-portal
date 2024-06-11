import pytest
from loans.models import Customer, LoanOffer

@pytest.mark.django_db
def test_create_customer():
    customer = Customer.objects.create(name="Sarim", email="sarim@gmail.com")
    assert customer.name == "Sarim"
    assert customer.email == "sarim@gmail.com"

@pytest.mark.django_db
def test_create_loan_offer():
    # Create a customer and a loan offer instance
    customer = Customer.objects.create(name="Bob", email="bob@example.com")
    loan_offer = LoanOffer.objects.create(
        customer=customer,
        amount=1000.00,
        interest_rate=5.0,
        term=12
    )
    assert loan_offer.customer == customer
    assert loan_offer.amount == 1000.00