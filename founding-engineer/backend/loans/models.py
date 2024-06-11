from django.db import models
from decimal import Decimal, ROUND_HALF_UP
import math

class Customer(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField(unique=True)

class LoanOffer(models.Model):
    customer = models.ForeignKey(Customer, on_delete=models.CASCADE)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    interest_rate = models.DecimalField(max_digits=5, decimal_places=2)
    term = models.IntegerField()

    def calculate_monthly_payment(self):
        monthly_rate = Decimal(self.interest_rate) / 100 / 12
        power = Decimal(-self.term)
        monthly_payment = (self.amount * monthly_rate) / (1 - (1 + monthly_rate).quantize(Decimal('1.000000000')) ** power)
        return monthly_payment.quantize(Decimal('0.01'), rounding=ROUND_HALF_UP)
