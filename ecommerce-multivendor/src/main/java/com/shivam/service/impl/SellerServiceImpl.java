package com.shivam.service.impl;

import com.shivam.config.JwtProvider;
import com.shivam.domain.AccountStatus;
import com.shivam.domain.USER_ROLE;
import com.shivam.exceptions.SellerException;
import com.shivam.modal.Address;
import com.shivam.modal.Seller;
import com.shivam.repository.AddressRepository;
import com.shivam.repository.SellerRepository;
import com.shivam.service.SellerService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class SellerServiceImpl implements SellerService {

    private final SellerRepository sellerRepository;
    private final JwtProvider jwtProvider;
    private final PasswordEncoder passwordEncoder;
    private final AddressRepository addressRepository;

    @Override
    public Seller getSellerProfile(String jwt) throws Exception {
        String email = jwtProvider.getEmailFromJwtToken(jwt);
        return this.getSellerByEmail(email);
    }

    @Override
    public Seller createSeller(Seller seller) throws Exception {
        Seller sellerExist = sellerRepository.findByEmail(seller.getEmail());
        if(sellerExist != null) {
            throw new Exception("seller already exists, use different email");
        }
        Address savedAddress = addressRepository.save(seller.getPickupAddress());
        Seller newSeller = new Seller();
        newSeller.setEmail(seller.getEmail());
        newSeller.setPassword(passwordEncoder.encode(seller.getPassword()));
        newSeller.setSellerName(seller.getSellerName());
        newSeller.setPickupAddress(savedAddress);
        newSeller.setGstin(seller.getGstin());
        newSeller.setRole(USER_ROLE.ROLE_SELLER);
        newSeller.setMobile(seller.getMobile());
        newSeller.setBankDetails(seller.getBankDetails());
        newSeller.setBusinessDetails(seller.getBusinessDetails());

        return sellerRepository.save(newSeller);
    }

    @Override
    public Seller getSellerById(Long id) throws SellerException {
        return sellerRepository.findById(id)
                .orElseThrow(() -> new SellerException("seller not found with id: " + id));
    }

    @Override
    public Seller getSellerByEmail(String email) throws Exception {
        Seller seller = sellerRepository.findByEmail(email);
        if(seller == null) {
            throw new Exception("seller not found ... ");
        }
        return seller;
    }

    @Override
    public List<Seller> getAllSellers(AccountStatus status) {
        return sellerRepository.findByAccountStatus(status);
    }

    @Override
    public Seller updateSeller(Long id, Seller seller) throws Exception {
        Seller existingSeller = sellerRepository.findById(id)
                .orElseThrow(() -> new Exception("seller not found with id: " + id));

        if(seller.getSellerName() != null) {
            existingSeller.setSellerName(seller.getSellerName());
        }

        if(seller.getMobile() != null) {
            existingSeller.setMobile(seller.getMobile());
        }

        if(seller.getEmail() != null) {
            existingSeller.setEmail(seller.getEmail());
        }

        if(seller.getBusinessDetails() != null
                &&  seller.getBusinessDetails().getBusinessName() != null) {

            existingSeller.getBusinessDetails().setBusinessName(seller.getBusinessDetails().getBusinessName());
        }

        if(seller.getBankDetails() != null
            && seller.getBankDetails().getAccountHolderName() != null
            && seller.getBankDetails().getIfscCode() != null
            && seller.getBankDetails().getAccountNumber() != null
        ) {
            existingSeller.getBankDetails().setAccountHolderName(
                    seller.getBankDetails().getAccountHolderName()
            );
            existingSeller.getBankDetails().setAccountNumber(
                    seller.getBankDetails().getAccountNumber()
            );
            existingSeller.getBankDetails().setIfscCode(
                    seller.getBankDetails().getIfscCode()
            );

        }

        if(seller.getPickupAddress() != null
                && seller.getPickupAddress().getAddress() != null
                && seller.getPickupAddress().getMobile() != null
                && seller.getPickupAddress().getCity() != null
                && seller.getPickupAddress().getState() != null
        ) {
            existingSeller.getPickupAddress()
                    .setAddress(seller.getPickupAddress().getAddress());
            existingSeller.getPickupAddress().setMobile(seller.getPickupAddress().getMobile());
            existingSeller.getPickupAddress().setCity(seller.getPickupAddress().getCity());
            existingSeller.getPickupAddress().setState(seller.getPickupAddress().getState());
            existingSeller.getPickupAddress().setPinCode(seller.getPickupAddress().getPinCode());
        }

        if(seller.getGstin() != null) {
            existingSeller.setGstin(seller.getGstin());
        }

        return sellerRepository.save(existingSeller);

    }

    @Override
    public void deleteSeller(Long id) throws Exception {

        Seller seller = getSellerById(id);
        sellerRepository.delete(seller);

    }

    @Override
    public Seller verifyEmail(String email, String otp) throws Exception {
        Seller seller = getSellerByEmail(email);
        seller.setEmailVerified(true);
        return sellerRepository.save(seller);
    }

    @Override
    public Seller updateSellerAccountStatus(Long sellerId, AccountStatus status) throws Exception {
        Seller seller = getSellerById(sellerId);
        seller.setAccountStatus(status);
        return sellerRepository.save(seller);
    }
}
