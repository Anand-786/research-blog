package com.research_blog.research_blog.utils;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Component
public class JwtUtil {
    private String SECRET_KEY = "my_super_secret_key_which_is_32_chars";

    public String generateToken(String username){
        Map<String, Object> claims = new HashMap<>();
        return createToken(claims,username);
    }

    public String createToken(Map<String, Object> claims,String subject){
        return Jwts.builder().
                claims(claims).
                subject(subject).
                header().empty().
                add("typ","JWT").
                and().
                issuedAt(new Date(System.currentTimeMillis())).
                expiration(new Date(System.currentTimeMillis()+ 1000*60*10)).
                signWith(getSigningKey()).
                compact();
    }

    public SecretKey getSigningKey(){
        return Keys.hmacShaKeyFor(SECRET_KEY.getBytes());
    }

}
