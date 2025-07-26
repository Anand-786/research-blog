package com.research_blog.research_blog.service;

import com.research_blog.research_blog.entity.Post;
import com.research_blog.research_blog.repository.PostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class AiVoiceService {
    @Value("${elevenlabs.url}")
    private String url;
    @Value("${elevenlabs.apikey}")
    private String apikey;
    @Value("${elevenlabs.voiceid}")
    private String voiceid;

    @Autowired
    private RestTemplate restTemplate;

    @Autowired
    private PostRepository postRepository;

    public ResponseEntity<?> voice(String id){
        Optional<Post> post = postRepository.findById(id);
        String text = "This is a Log titled:";
        System.out.println(text);
        String req = url+voiceid+"?output_format=mp3_44100_128";
        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.setContentType(MediaType.APPLICATION_JSON);
        httpHeaders.setAccept(List.of(MediaType.valueOf("audio/mpeg")));
        httpHeaders.set("xi-api-key",apikey);

        Map<String, Object> body = new HashMap<>();
        body.put("text",text);
        body.put("model_id","eleven_monolingual_v1");

        Map<String, Object> voiceSettings = Map.of("stability",0.5,"similarity_boost",0.75);
        body.put("voice_settings",voiceSettings);

        HttpEntity<Map<String, Object>> requestEntity = new HttpEntity<>(body,httpHeaders);

        ResponseEntity<byte[]> response = restTemplate.exchange(
                req,
                HttpMethod.POST,
                requestEntity,
                byte[].class
        );

            byte[] mp3bytes = response.getBody();

            HttpHeaders responseHeaders = new HttpHeaders();
            responseHeaders.set("Content-Type","audio/mpeg");
            responseHeaders.set("Content-Disposition","inline; filename=\"speechis.mp3\"");

            return new ResponseEntity<>(mp3bytes,responseHeaders,HttpStatus.OK);
    }
}
