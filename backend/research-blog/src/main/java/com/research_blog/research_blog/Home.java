package com.research_blog.research_blog;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class Home {

    @GetMapping("home")
    public String home(){
        return "Hello World! This is my Home Page.";
    }
}
