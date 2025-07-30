package com.research_blog.research_blog.controller;

import com.research_blog.research_blog.entity.Post;
import com.research_blog.research_blog.service.CategoryService;
import com.research_blog.research_blog.service.PostService;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@CrossOrigin(origins = "https://researchlog.vercel.app/")
@RestController
@RequestMapping("logs/")
public class PostController {
    @Autowired
    private PostService postService;

    @Autowired
    private CategoryService categoryService;

    @PostMapping("create-log")
    public ResponseEntity<?> createPost(@RequestBody Post post){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String userName = authentication.getName();
        post.setAuthor(userName);
        postService.createPost(post);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @PutMapping("edit-log/{id}")
    public ResponseEntity<?> editPost(@RequestBody Post newPost, @PathVariable String id){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String userName = authentication.getName();
        newPost.setAuthor(userName);
        postService.editPost(id,newPost);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @DeleteMapping("del-log/{id}")
    public ResponseEntity<?> deletePost(@PathVariable String id){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String userName = authentication.getName();
        postService.deletePost(userName,id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("get-log/{id}")
    public ResponseEntity<?> fetchPost(@PathVariable String id){
        return postService.fetchPost(id);
    }
}
