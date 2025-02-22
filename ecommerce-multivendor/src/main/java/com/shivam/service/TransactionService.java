package com.shivam.service;

import com.shivam.modal.Order;
import com.shivam.modal.Seller;
import com.shivam.modal.Transaction;

import java.util.List;

public interface TransactionService {

    Transaction createTransaction(Order order);
    List<Transaction> getTransactionBySellerId(Seller seller);
    List<Transaction> getAllTransactions();
}
