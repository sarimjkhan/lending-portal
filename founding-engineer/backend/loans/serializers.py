from rest_framework import serializers
from .models import Customer, LoanOffer

class CustomerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Customer
        fields = '__all__'

class LoanOfferSerializer(serializers.ModelSerializer):
    customer = serializers.PrimaryKeyRelatedField(queryset=Customer.objects.all())

    class Meta:
        model = LoanOffer
        fields = '__all__'
        depth = 1

    def validate_amount(self, value):
        if value < 0:
            raise serializers.ValidationError("Amount must be positive")
        return value
    
    def validate_interest_rate(self, value):
        if value < 0:
            raise serializers.ValidationError("Interest must be positive")
        return value
    
    def validate_term(self, value):
        if value < 0:
            raise serializers.ValidationError("Term must be positive")
        return value