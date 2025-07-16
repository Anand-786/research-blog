package com.research_blog.research_blog.controller;

import com.research_blog.research_blog.entity.Post;
import com.research_blog.research_blog.service.CategoryService;
import com.research_blog.research_blog.service.PostService;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("logs/")
public class PostController {
    @Autowired
    private PostService postService;

    @Autowired
    private CategoryService categoryService;

    @PostMapping("create-log")
    public ResponseEntity<?> createPost(@RequestBody Post post){
        //Set author name from authenticated context
        postService.createPost(post);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @PostMapping("edit-log/{id}")
    public ResponseEntity<?> editPost(@RequestBody Post newPost, @PathVariable ObjectId id){
        postService.editPost(id,newPost);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @DeleteMapping("del-log/{userName}/{id}")
    public ResponseEntity<?> deletePost(@PathVariable ObjectId id,@PathVariable String userName){
        postService.deletePost(userName,id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

}
