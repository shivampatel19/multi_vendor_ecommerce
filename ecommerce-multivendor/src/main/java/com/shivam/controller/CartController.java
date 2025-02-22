package com.shivam.controller;

import com.shivam.exceptions.ProductException;
import com.shivam.modal.Cart;
import com.shivam.modal.CartItem;
import com.shivam.modal.Product;
import com.shivam.modal.User;
import com.shivam.request.AddItemRequest;
import com.shivam.response.ApiResponse;
import com.shivam.service.CartItemService;
import com.shivam.service.CartService;
import com.shivam.service.ProductService;
import com.shivam.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/cart")
public class CartController {
    private final CartService cartService;
    private final CartItemService cartItemService;
    private final UserService userService;
    private final ProductService productService;

    @GetMapping()
    public ResponseEntity<Cart> findUserCartHandler(
            @RequestHeader("Authorization") String jwt
    ) throws Exception {

        User user = userService.findUserByJwtToken(jwt);
        Cart cart = cartService.findUserCart(user);

        System.out.println("Cart : " + cart.getUser().getEmail());

        return new ResponseEntity<>(cart, HttpStatus.OK);
    }

    @PutMapping("/add")
    public ResponseEntity<CartItem> addItemToCart(
            @RequestBody AddItemRequest req,
            @RequestHeader("Authorization") String jwt
    ) throws ProductException, Exception {
        User user = userService.findUserByJwtToken(jwt);
        Product product = productService.findProductById(req.getProductId());

        CartItem item = cartService.addCartItem(user,
                product,
                req.getSize(),
                req.getQuantity());

        ApiResponse res = new ApiResponse();
        res.setMessage("Item added to Cart Successfully");

        return new ResponseEntity<>(item, HttpStatus.OK);

    }

    @DeleteMapping("/item/{cartItemId}")
    public ResponseEntity<ApiResponse> deleteCartItemHandler(
            @PathVariable Long cartItemId,
            @RequestHeader("Authorization") String jwt
    ) throws Exception {

        User user = userService.findUserByJwtToken(jwt);
        cartItemService.removeCartItem(user.getId(), cartItemId);
        ApiResponse res = new ApiResponse();
        res.setMessage("Item deleted from Cart Successfully");

        return new ResponseEntity<>(res, HttpStatus.OK);
    }

    @PutMapping("/item/{cartItemId}")
    public ResponseEntity<CartItem> updateCartItemHandler(
            @PathVariable Long cartItemId,
            @RequestBody CartItem cartItem,
            @RequestHeader("Authorization") String jwt
    ) throws Exception {

        User user = userService.findUserByJwtToken(jwt);

        CartItem updatedCartItem = null;
        if(cartItem.getQuantity() > 0){
            updatedCartItem = cartItemService.updateCartItem(user.getId(), cartItemId, cartItem);
        }

        return new ResponseEntity<>(updatedCartItem, HttpStatus.ACCEPTED);
    }

}
