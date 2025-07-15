package com.research_blog.research_blog.controller;

import com.research_blog.research_blog.entity.Post;
import com.research_blog.research_blog.service.PostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("logs/")
public class PostController {
    @Autowired
    private PostService postService;

    @PostMapping("create-log")
    public ResponseEntity<?> createPost(@RequestBody Post post){
        //Set author name from authenticated context
        postService.createPost(post);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }
}
