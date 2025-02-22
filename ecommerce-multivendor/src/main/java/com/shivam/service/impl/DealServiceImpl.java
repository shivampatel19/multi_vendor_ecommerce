package com.shivam.service.impl;

import com.shivam.modal.Deal;
import com.shivam.modal.HomeCategory;
import com.shivam.repository.DealRepository;
import com.shivam.repository.HomeCategoryRepository;
import com.shivam.service.DealService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor

public class DealServiceImpl implements DealService {

    private final DealRepository dealRepository;
    private final HomeCategoryRepository homeCategoryRepository;

    @Override
    public List<Deal> getDeals() {
        return dealRepository.findAll();
    }

    @Override
    public Deal createDeal(Deal deal) {
        HomeCategory category = homeCategoryRepository.findById(deal.getCategory().getId())
                .orElse(null);
        Deal newDeal = dealRepository.save(deal);
        newDeal.setCategory(category);
        newDeal.setDiscount(deal.getDiscount());
        return dealRepository.save(newDeal);
    }

    @Override
    public Deal updateDeal(Deal deal, Long id) throws Exception {
        Deal existingdeal = dealRepository.findById(id).orElse(null);
        HomeCategory category = homeCategoryRepository.findById(deal.getCategory().getId()).orElse(null);

        if(existingdeal != null) {
            if(deal.getDiscount() != null) {
                existingdeal.setDiscount(deal.getDiscount());
            }
            if(category != null) {
                existingdeal.setCategory(category);
            }
            return dealRepository.save(existingdeal);

        }
        throw new Exception("Deal not found");
    }

    @Override
    public void deleteDeal(Long id) throws Exception {
        Deal deal = dealRepository.findById(id).orElseThrow(
                ()-> new Exception("deal not found"));
                dealRepository.delete(deal);

    }
}
