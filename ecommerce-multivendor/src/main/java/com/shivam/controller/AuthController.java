package com.shivam.controller;

import com.shivam.domain.USER_ROLE;
import com.shivam.modal.VerificationCode;
import com.shivam.repository.UserRepository;
import com.shivam.request.LoginOtpRequest;
import com.shivam.request.LoginRequest;
import com.shivam.request.SignupRequest;
import com.shivam.response.ApiResponse;
import com.shivam.response.AuthResponse;
import com.shivam.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor //so that we do not need to create constructor
@RestController //make class act as controller class
@RequestMapping("/auth")
public class AuthController {

    private final UserRepository userRepository;
    private final AuthService authService;

    @PostMapping("/signup")
    public ResponseEntity<AuthResponse> createUserHandler(@RequestBody SignupRequest req) throws Exception {
        String jwt = authService.createUser(req);
        AuthResponse res = new AuthResponse();
        res.setJwt(jwt);
        res.setRole(USER_ROLE.ROLE_CUSTOMER);
        res.setMessage("register success");
        return ResponseEntity.ok(res);
    }

    @PostMapping("/sent/login-signup-otp")
    public ResponseEntity<ApiResponse> sendOtpHandler(
            @RequestBody LoginOtpRequest req) throws Exception {
        authService.sendLoginOtp(req.getEmail(), req.getRole());
        ApiResponse res = new ApiResponse();
        res.setMessage("otp sent successfully");
        return ResponseEntity.ok(res);
    }

    @PostMapping("/signing")
    public ResponseEntity<AuthResponse> loginHandler(@RequestBody LoginRequest req) throws Exception {

        AuthResponse res = authService.signing(req);
        res.setMessage("Login successful");
        return ResponseEntity.ok(res);
    }

}