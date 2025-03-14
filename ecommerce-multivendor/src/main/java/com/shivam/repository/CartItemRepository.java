package com.shivam.repository;

import com.shivam.modal.Cart;
import com.shivam.modal.CartItem;
import com.shivam.modal.Product;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CartItemRepository extends JpaRepository<CartItem, Long> {

    CartItem findByCartAndProductAndSize(Cart cart, Product product, String size);
}
