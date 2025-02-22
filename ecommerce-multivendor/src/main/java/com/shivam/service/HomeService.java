package com.shivam.service;

import com.shivam.modal.Home;
import com.shivam.modal.HomeCategory;

import java.util.List;

public interface HomeService {
    public Home createHomePageData(List<HomeCategory> allCategories);

}
