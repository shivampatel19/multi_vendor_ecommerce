package com.shivam.modal;

import lombok.Data;

import java.util.List;

//not a entity just a class
@Data
public class Home {

    private List<HomeCategory> grid;

    private List<HomeCategory> shopByCategories;

    private List<HomeCategory> electricCategories;
    private List<HomeCategory> dealsCategories;
    private List<Deal> deals;

}