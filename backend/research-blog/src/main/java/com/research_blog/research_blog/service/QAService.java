package com.research_blog.research_blog.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.research_blog.research_blog.entity.Post;
import com.research_blog.research_blog.repository.PostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.client.RestTemplate;

import java.util.*;

@Service
public class QAService {
    @Value("${gemini.apikey}")
    private String token;
    @Value("${gemini.url}")
    private String url;
    @Autowired
    private PostRepository postRepository;

    @Autowired
    private RestTemplate restTemplate;

    public ResponseEntity<?> getAIAns(String id,String ques) throws JsonProcessingException {
        Optional<Post> post = postRepository.findById(id);
        String prompt = "Answer this question based on the context. If the exact answer isn't in the context but a concept is mentioned, explain what it means based on your knowledge.\n\nContext: "+post.get().getTitle()+". "+post.get().getMainbody()+"\n\nQuestion: "+ques+"\n\nAnswer: ";
        String reqUrl = url+"?key=" + token;
        Map<String, Object> requestBody = new HashMap<>();

        Map<String, Object> parts = new HashMap<>();
        parts.put("text", prompt);
        Map<String, Object> contents = new HashMap<>();
        contents.put("parts", Arrays.asList(parts));
        requestBody.put("contents", Arrays.asList(contents));
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        HttpEntity<Map<String, Object>> entity = new HttpEntity<>(requestBody, headers);

        ResponseEntity<String> response = restTemplate.exchange(
                reqUrl,
                HttpMethod.POST,
                entity,
                String.class
        );
        String answer = new ObjectMapper().readTree(response.getBody()).path("candidates").path(0).path("content").path("parts").path(0).path("text").asText();
        Map<String,String> resp = new HashMap<>();
        resp.put("answer",answer);

        return new ResponseEntity<>(resp,HttpStatus.OK);
    }
}
