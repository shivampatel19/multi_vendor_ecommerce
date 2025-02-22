package com.shivam.service;

import com.shivam.modal.Seller;
import com.shivam.modal.SellerReport;

public interface SellerReportService {

    SellerReport getSellerReport(Seller seller);
    SellerReport updateSellerReport(SellerReport sellerReport);
}
