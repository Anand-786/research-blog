package com.research_blog.research_blog.controller;

import com.research_blog.research_blog.entity.Post;
import com.research_blog.research_blog.service.AiVoiceService;
import com.research_blog.research_blog.service.PostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("ai-voice/")
public class VoiceController {
    @Autowired
    private AiVoiceService aiVoiceService;

    @GetMapping("get/{id}")
    public ResponseEntity<?> getVoice(@PathVariable String id){
        return aiVoiceService.voice(id);
    }
}
