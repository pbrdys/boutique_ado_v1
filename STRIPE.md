# Step 1: Include Stripe Javascript
<script src="https://js.stripe.com/v3/"></script>
Add this to base.html template


# Step 2: 
We have to write this code in checkout.html because we can not access 
template variables in other files. We will have to write the code to render 
the stripe card element in a javascript file and we will need to access the public/secret key for that.

{% block postloadjs %}
    {{ block.super }}
    {{ stripe_public_key|json_script:"id_stripe_public_key"}}
    {{ client_secret|json_script:"id_client_secret"}}
    <script src={% static 'checkout/js/stripe_elements.js' %}></script>
{% endblock %}


# Step 3: javascript to render stripe card
create /js folder within static/checkout 
create file: stripe_elements.js

- get the keys (public, secret)
- get stripe js class 
- create element object via stripe class
- mount element to div in template 

# Step 4: extend javascript
Handle realtime validation errors on card element 

- add eventListener to card element 
- show error message in card-error-div in template 

Stripe is working with so called payment-intents
and it works like this: 
- User enters the checkout page
- Checkout view creates stripe payment-intent for current amount of shopping bag
- Stripe returns client_secret, which we return to the template 
- Use client_secret in the template to call confirmCardPayment() javascript function and verify the card


# Step 5: install stripe
pip3 install stripe 

and then import at checkout/views.py


# Step 6: adjust settings 
FREE_DELIVERY_THRESHOLD = 50
STANDARD_DELIVERY_PERCENTAGE = 10
STRIPE_CURRENCY = 'usd'
STRIPE_PUBLIC_KEY = os.getenv('STRIPE_PUBLIC_KEY', '')
STRIPE_SECRET_KEY = os.getenv('STRIPE_SECRET_KEY', '')
STRIPE_WH_SECRET = os.getenv('STRIPE_WH_SECRET', '')

# Step 7: Add Event Listener to Form Submit Event 
- copy code from stripe documentation (https://docs.stripe.com/payments/accept-a-payment?platform=web&ui=elements#web-submit-payment)


# Step 8: Create checkout_success page 
- views.checkout -> create instance of form_data and session['save_info']
- views.checkout -> save the order_form
- redirect to checkout_success
- create checkout_success view 
- create checkout_success template 
- add default_app_config = 'checkout.apps.CheckoutConfig' to __init__.py 


# Step 9: 
