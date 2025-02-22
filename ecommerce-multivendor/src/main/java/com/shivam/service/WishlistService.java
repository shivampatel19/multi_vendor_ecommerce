package com.shivam.service;

import com.shivam.modal.Product;
import com.shivam.modal.User;
import com.shivam.modal.Wishlist;

public interface WishlistService {
    Wishlist createWishlist(User user);
    Wishlist getWishlistByUserId(User user);
    Wishlist addProductToWishlist(User user, Product product);
}
