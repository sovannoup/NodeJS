from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from .serializers import CardSerializer
from .models import Card

import stripe

stripe.api_key = "PUT_YOUR_SECRET_KEY_FROM_STRIPE_HERE"

class PaymentViewSet(viewsets.ModelViewSet):
    serializer_class = CardSerializer


    @action(detail=	False, methods=['post'])
    def charge(self, request):
        serializer = CardSerializer(data = request.data)
        print(request.data)
        if serializer.is_valid():
            serializer.save()
        else:
            return Response(serializer.error,status=status.HTTP_400_BAD_REQUEST)
        stripeToken = stripe.Token.create(
            card={
                #here we get data from user and put it here
                "number": int(serializer.data.get('card_num')),
                "exp_month": int(serializer.data.get('exp_month')),
                "exp_year": int(serializer.data.get('exp_year')),
                "cvc": int(serializer.data.get('cvc')),
                    },)
        customer = stripe.Customer.create(
            #plan_num = serializer.data.get('plan_num'),
            source = stripeToken.id
            )
        charge = stripe.Charge.create(
            customer = customer,
            amount = 500,
            currency = "usd",
            description="Stripe Charges for service"
            )
        ##update plan
        return Response("Well Done")