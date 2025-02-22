package com.shivam.config;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.security.Key;
import java.util.*;

@Service
public class JwtProvider {
    //    to generate jwt at sign in and sign up
    SecretKey key = Keys.hmacShaKeyFor(JWT_CONSTANT.SECRET_KEY.getBytes());

    public String generateToken(Authentication auth){
        Collection<? extends GrantedAuthority> authorities = auth.getAuthorities(); //Retrieves the user's roles/authorities from the Authentication object.
        String roles = populateAuthorities(authorities); //Calls populateAuthorities(authorities) to convert roles into a comma-separated string.
        /* expiration set at 24 hours */
        return Jwts.builder()
                .setIssuedAt(new Date())
                .setExpiration(new Date(new Date().getTime()+ 8640000)) //expiration set at 24 hours
                .claim("email", auth.getName())
                .claim("authorities", roles)
                .signWith(key)
                .compact();
    }

    public String getEmailFromJwtToken(String jwt){
        jwt = jwt.substring(7); //Remove "Bearer " Prefix
        Claims claims = Jwts.parserBuilder().setSigningKey(key).build()
                .parseClaimsJws(jwt).getBody();
        return String.valueOf(claims.get("email"));
    }

    private String populateAuthorities(Collection<? extends GrantedAuthority> authorities) {
        Set<String> auths =new HashSet<>();
        for(GrantedAuthority authority: authorities){
            auths.add(authority.getAuthority());
        }
        return String.join(",", auths);
    }
}