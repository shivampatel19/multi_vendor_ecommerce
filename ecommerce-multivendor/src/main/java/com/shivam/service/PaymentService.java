package com.shivam.service;

import com.razorpay.PaymentLink;
import com.razorpay.RazorpayException;
import com.shivam.modal.Order;
import com.shivam.modal.PaymentOrder;
import com.shivam.modal.User;
import com.stripe.exception.StripeException;

import java.util.Set;

public interface PaymentService {
    PaymentOrder createOrder(User user, Set<Order> orders);
    PaymentOrder getPaymentOrderById(Long orderId) throws Exception;
    PaymentOrder getPaymentOrderByPaymentId(String orderId) throws Exception;
    Boolean ProceedPaymentOrder(PaymentOrder paymentOrder,
                                String paymentId,
                                String paymentLinkId) throws RazorpayException;
    PaymentLink createRazorpayPaymentLink(User user, Long amount,
                                          Long orderId);
    String createStripePaymentLink(User user, Long amount, Long orderId) throws StripeException;
}
