/*
    Core logic/payment flow for this comes from here:
    https://stripe.com/docs/payments/accept-a-payment

    CSS from here: 
    https://stripe.com/docs/stripe-js
*/

/* use .slice() to remove quotes */
var stripePublicKey = $('#id_stripe_public_key').text().slice(1, -1);
var clientSecret = $('#id_client_secret').text().slice(1, -1);
/* https://docs.stripe.com/payments/accept-a-payment?platform=web&ui=elements#set-up-stripe.js */
var stripe = Stripe(stripePublicKey);
var elements = stripe.elements();
var style = {
    base: {
        color: '#000',
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSmoothing: 'antialiased',
        fontSize: '16px',
        '::placeholder': {
            color: '#aab7c4'
        }
    },
    invalid: {
        color: '#dc3545',
        iconColor: '#dc3545'
    }
};
var card = elements.create('card', {style: style});
/* checkout.html : <div class="mb-3" id="card-element"></div> */
card.mount('#card-element');


// Handle realtime validation errors on the card element
card.addEventListener('change', function (event) {
    // checkout.html : <div class="mb-3 text-danger" id="card-errors" role="alert"></div>
    var errorDiv = document.getElementById('card-errors');
    // i could also use jquery $('#card-errors');
    if (event.error) {
        var html = `
            <span class="icon" role="alert">
                <i class="fas fa-times"></i>
            </span>
            <span>${event.error.message}</span>
        `;
        $(errorDiv).html(html);
    } else {
        errorDiv.textContent = '';
    }
});

// Step 1: Checkout view creates Stripe paymentIntent 
// Step 2: Stripe returns clientSecret, which we return to the template 
// Step 3: Use clientSecret in template to call confirmCardPayment() and verify the card


// Handle form submit
var form = document.getElementById('payment-form');

form.addEventListener('submit', function(ev) {
    // prevent the form submit POST and instead use the code below
    ev.preventDefault();
    // disable card and submit button first
    card.update({'disabled':true});
    $('#submit-button').attr('disabled', true);
    // CONFIRM CARD PAYMENT
    stripe.confirmCardPayment(clientSecret, {
        payment_method: {
            card: card,
        }
    }).then(function(result) {
        if(result.error) {
            // Show error to your customer (e.g. insufficient funds)
            console.log(result.error.message);
            var html = `
                <span class="icon" role="alert">
                    <i class="fas fa-times"></i>
                </span>
                <span>${result.error.message}</span>
            `;
            $(errorDiv).html(html);
            // enable again to allow user to fix errors
            card.update({ 'disabled': false});
            $('#submit-button').attr('disabled', false);
        } else {
            // The payment has been processed!
            if(result.paymentIntent.status == 'succeeded') {
                form.submit();
                // Show a success message to your customer
                // There's a risk of the customer closing the window before callback execution.
                // Set up a webhook or plugin to listen for the paymentIntent.succeeded event
                // that handles any business critical post-payment actions. 
            }
        }
    });
});