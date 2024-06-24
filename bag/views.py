from django.shortcuts import render, redirect

# Create your views here.

def view_bag(request):
    """ A view that renders the bag contents page """

    return render(request, 'bag/bag.html')

def add_to_bag(request, item_id):
    """ Add a quantity of the specified product to the shopping bag """

    quantity = int(request.POST.get('quantity'))
    redirect_url = request.POST.get('redirect_url')
    size = None
    
    if 'product_size' in request.POST:
        size = request.POST['product_size']   
    # retrieve the current shopping bag from the user's session. 
    # If the bag does not exist in the session, it initializes bag as an empty dictionary {}.
    bag = request.session.get('bag', {})
    
    # if product has_sizes
    if size:
        # if item with the id is already in the bag, then ...
        if item_id in list(bag.keys()):
            # check if the existing item exists with the same size or not
            if size in bag[item_id]['items_by_size'].keys():
                bag[item_id]['items_by_size'][size] += quantity
            else:
                bag[item_id]['items_by_size'][size] = quantity
        else:
            # if item not existing, add it as dictionary to bag[item_id]
            # because we can have items with the same id but different sizes in our bag
            bag[item_id] = {'items_by_size': {size: quantity}}
    else:
        # else if product has no sizes
        if item_id in list(bag.keys()):
            bag[item_id] += quantity
        else: # If it is not, it adds item_id to the bag dictionary with the value quantity.
            bag[item_id] = quantity   

    request.session['bag'] = bag
    return redirect(redirect_url)
    