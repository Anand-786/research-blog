package com.research_blog.research_blog.controller;

import com.research_blog.research_blog.service.AiSummaryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("ai-summary/")
public class AiSummaryController {
    @Autowired
    private AiSummaryService aiSummaryService;

    @PostMapping("get")
    public ResponseEntity<?> getAISummary(@RequestBody Map<String, String> query){
        String text=query.get("text");
        return aiSummaryService.summary(text);
    }
}
