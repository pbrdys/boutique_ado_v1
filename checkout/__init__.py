# without this line django wouldn't know about our custom ready methods
# so our signals wouldn't work
default_app_config = 'checkout.apps.CheckoutConfig'