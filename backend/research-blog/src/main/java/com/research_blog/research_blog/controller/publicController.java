package com.research_blog.research_blog.controller;

import com.research_blog.research_blog.entity.User;
import com.research_blog.research_blog.service.CategoryService;
import com.research_blog.research_blog.service.PostService;
import com.research_blog.research_blog.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("public/")
public class publicController {
    @Autowired
    private UserService userService;
    @Autowired
    private PostService postService;
    @Autowired
    private CategoryService categoryService;

    @PostMapping("signup")
    public ResponseEntity<?> createUser(@RequestBody User user){
        userService.saveNewUser(user);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @GetMapping("random-logs")
    public ResponseEntity<?> getRandomPosts(){
        return postService.getRandomPosts();
    }

    @PostMapping("search/{categoryName}")
    public ResponseEntity<?> searchByTags(@RequestBody Map<String, String> body, @PathVariable String categoryName){
        return new ResponseEntity<>(categoryService.searchByTags(body.get("text"),categoryName),HttpStatus.OK);
    }
}
