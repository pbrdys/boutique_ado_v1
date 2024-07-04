from django.shortcuts import render, redirect, reverse
from django.contrib import messages

from .forms import OrderForm


def checkout(request):
    bag = request.session.get('bag', {})
    if not bag:
        messages.error(request, "There's nothing in your bag at the moment")
        return redirect(reverse('products'))

    order_form = OrderForm()
    template = 'checkout/checkout.html'
    context = {
        'order_form': order_form,
        'stripe_public_key': 'pk_test_51PWeJOIo12wgYcCdQ1qBmtod3dlu1xz6ATnISNZgdp4vjX27hs6zZykc29kkhFu8IojgIxRMY6xCfHnsGGGGslWH00MogFxBbr',
        'client_secret': 'Test Client Secret'
    }

    return render(request, template, context)