package com.shivam.service.impl;

import com.shivam.config.JwtProvider;
import com.shivam.domain.USER_ROLE;
import com.shivam.modal.Cart;
import com.shivam.modal.Seller;
import com.shivam.modal.User;
import com.shivam.modal.VerificationCode;
import com.shivam.repository.CartRepository;
import com.shivam.repository.SellerRepository;
import com.shivam.repository.UserRepository;
import com.shivam.repository.VerificationCodeRepository;
import com.shivam.request.LoginRequest;
import com.shivam.request.SignupRequest;
import com.shivam.response.AuthResponse;
import com.shivam.service.AuthService;
import com.shivam.service.EmailService;
import com.shivam.utils.OtpUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final CartRepository cartRepository;
    private final JwtProvider jwtProvider;
    private final VerificationCodeRepository verificationCodeRepository;
    private final EmailService emailService;
    private final CustomUserServiceImpl customUserService;
    private final SellerRepository sellerRepository;

    @Override
    public String createUser(SignupRequest req) throws Exception {
        VerificationCode verificationCode = verificationCodeRepository.findByEmail(req.getEmail());
        //if verification code present
        if(verificationCode == null || !verificationCode.getOtp().equals(req.getOtp())){
            throw new Exception("wrong otp...");
        }

        //if user already exists
        User user = userRepository.findByEmail(req.getEmail());
        if (user == null){
            //create new user
            User createdUser = new User();
            createdUser.setEmail(req.getEmail());
            createdUser.setFullName(req.getFullName());
            createdUser.setRole(USER_ROLE.ROLE_CUSTOMER);
            createdUser.setMobile("9090909009");
            createdUser.setPassword(passwordEncoder.encode(req.getOtp()));

            user = userRepository.save(createdUser);

            Cart cart= new Cart();
            cart.setUser(user);
            cartRepository.save(cart);
        }
//        generate jwt
//        create authorization using granted authority
        List<GrantedAuthority> authorities = new ArrayList<>();
        authorities.add((new SimpleGrantedAuthority(USER_ROLE.ROLE_CUSTOMER.toString())));

        UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(req.getEmail(),null, authorities ); //This object represents an authenticated user with their email and roles.
        /*
        What is UsernamePasswordAuthenticationToken?

        UsernamePasswordAuthenticationToken is a class in Spring Security that represents an authentication request or an authenticated principal.
        Constructor Breakdown

        new UsernamePasswordAuthenticationToken(principal, credentials, authorities);

        principal → Represents the user's identity (usually the email or username).
        credentials → Represents the user's password (set to null here since we're not using it after authentication).
        authorities → Represents the roles/permissions assigned to the user (e.g., ROLE_CUSTOMER).

         */
        SecurityContextHolder.getContext().setAuthentication(authentication);
        /*
        What is SecurityContextHolder?

            SecurityContextHolder holds the security context of the current request.
            The security context stores details of the authenticated user.

        What Does This Line Do?

            It sets the authenticated user in the security context.
            This ensures that Spring Security knows the user is logged in and can retrieve their details in other parts of the application.
         */
        return jwtProvider.generateToken(authentication);
    }


    @Override
    public void sendLoginOtp(String email, USER_ROLE role) throws Exception {
        System.out.println("Running send login OTP...");
        String SIGNING_PREFIX = "signing_";

        if (email.startsWith(SIGNING_PREFIX)) {
            System.out.println("Signing prefix email " + email);
            email = email.substring(SIGNING_PREFIX.length());

            if(role == USER_ROLE.ROLE_SELLER){
                Seller seller = sellerRepository.findByEmail(email);
                if(seller == null) {
                    throw new Exception("seller not found");
                }
            }
            else{
                System.out.println("email " + email);
                User user = userRepository.findByEmail(email);
                if (user == null) {
                    throw new Exception("User not exists with provided email");
                }
            }


        }
        VerificationCode isExist = verificationCodeRepository.findByEmail(email);

        if (isExist != null) {
            verificationCodeRepository.delete(isExist);
        }
        String otp = OtpUtil.generateOtp();
        VerificationCode verificationCode = new VerificationCode();
        verificationCode.setOtp(otp);
        verificationCode.setEmail(email);
        verificationCodeRepository.save(verificationCode);

        String subject = "multi vendor ecommerce login/signup otp";
        String text = "your login/signup otp is - " + otp;

        emailService.sendVerificationOtpEmail(email, otp, subject, text);

    }

    @Override
    public AuthResponse signing(LoginRequest req) throws Exception {
        String username = req.getEmail();
        String otp = req.getOtp();

        Authentication authentication = authenticate(username, otp);
        SecurityContextHolder.getContext().setAuthentication(authentication);

        String token = jwtProvider.generateToken(authentication);
        AuthResponse authResponse = new AuthResponse();
        authResponse.setJwt(token);
        authResponse.setMessage("Login success");

        Collection<? extends GrantedAuthority> authorities = authentication.getAuthorities();
        String roleName = authorities.isEmpty() ? null : authorities.iterator().next().getAuthority();

        authResponse.setRole(USER_ROLE.valueOf(roleName));

        return authResponse;
    }

    private Authentication authenticate(String username, String otp) throws Exception {

        UserDetails userDetails = customUserService.loadUserByUsername(username);

        String SELLER_PREFIX = "seller_";
        if(username.startsWith(SELLER_PREFIX)){
            username = username.substring(SELLER_PREFIX.length());
        }

        if (userDetails == null) {
            throw new Exception("Invalid username");
        }
        VerificationCode verificationCode = verificationCodeRepository.findByEmail(username);
        if (verificationCode == null || !verificationCode.getOtp().equals(otp)) {
            throw new Exception("wrong otp");
        }
        return new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
    }
}