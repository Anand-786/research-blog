package com.research_blog.research_blog.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.research_blog.research_blog.service.QAService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("ai-qna/")
public class QAController {
    @Autowired
    private QAService qaService;

    @PostMapping("ask")
    public ResponseEntity<?> askQues(@RequestBody Map<String,String> body) throws JsonProcessingException {
        String id = body.get("id");
        String ques = body.get("ques");
        return qaService.getAIAns(id,ques);
    }
}
