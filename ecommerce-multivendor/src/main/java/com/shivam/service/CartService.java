package com.shivam.service;

import com.shivam.modal.Cart;
import com.shivam.modal.CartItem;
import com.shivam.modal.Product;
import com.shivam.modal.User;

public interface CartService {

    public CartItem addCartItem(
            User user,
            Product product,
            String size,
            int quantity
    );
    public Cart findUserCart(User user);
}
