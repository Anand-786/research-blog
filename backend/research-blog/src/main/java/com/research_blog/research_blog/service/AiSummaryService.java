package com.research_blog.research_blog.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.Collection;
import java.util.Collections;
import java.util.HashMap;
import java.util.Map;

@Service
public class AiSummaryService {
    @Value("${api.key}")
    private String API_KEY;
    @Value("${api}")
    private String API;

    @Autowired
    private RestTemplate restTemplate;

    public ResponseEntity<?> summary(String text){
        Map<String, String> body = new HashMap<>();
        body.put("inputs",text);
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.setBearerAuth(API_KEY);
        headers.setAccept(Collections.singletonList(MediaType.APPLICATION_JSON));
        HttpEntity<Map<String, String>> entity = new HttpEntity<>(body,headers);
        String response = restTemplate.exchange(API, HttpMethod.POST,entity,String.class).getBody();
        response = response.substring(18,response.length()-3);
        Map<String, String> result = new HashMap<>();
        result.put("summary",response);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }
}
