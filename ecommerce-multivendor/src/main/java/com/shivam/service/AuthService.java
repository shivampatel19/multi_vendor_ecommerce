package com.shivam.service;

import com.shivam.domain.USER_ROLE;
import com.shivam.request.LoginRequest;
import com.shivam.request.SignupRequest;
import com.shivam.response.AuthResponse;

public interface AuthService {
    String createUser(SignupRequest req) throws Exception;
    void sendLoginOtp(String email, USER_ROLE role) throws Exception;
    AuthResponse signing(LoginRequest req) throws Exception;
}