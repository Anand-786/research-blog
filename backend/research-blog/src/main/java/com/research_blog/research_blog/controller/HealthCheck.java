package com.research_blog.research_blog.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
public class HealthCheck {

    @GetMapping("health-check")
    public String healthCheck(){
        return "Ok";
    }
}
