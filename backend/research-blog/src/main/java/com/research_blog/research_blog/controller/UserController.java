package com.research_blog.research_blog.controller;

import com.research_blog.research_blog.entity.Category;
import com.research_blog.research_blog.entity.User;
import com.research_blog.research_blog.service.PostService;
import com.research_blog.research_blog.service.UserService;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("user/")
public class UserController {
    @Autowired
    private UserService userService;

    @Autowired
    private PostService postService;

    @GetMapping("my-logs")
    public ResponseEntity<?> getAllMyPosts(){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String userName = authentication.getName();
        return new ResponseEntity<>(userService.getAllMyPosts(userName),HttpStatus.OK);
    }

    @GetMapping("subscribe/{categoryName}")
    public ResponseEntity<?> subscribeToCategory(@PathVariable String categoryName){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String userName = authentication.getName();
        return userService.subscribeToCategory(categoryName,userName);
    }

    @GetMapping("unsubscribe/{categoryName}")
    public ResponseEntity<?> unsubscribeToCategory(@PathVariable String categoryName){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String userName = authentication.getName();
        return userService.unsubscribeToCategory(categoryName,userName);
    }

    @GetMapping("subscribed-logs")
    public ResponseEntity<?> getALlMySubscribedPosts(){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String userName = authentication.getName();
        return new ResponseEntity<>(userService.getMySubscribedCategoryPosts(userName),HttpStatus.OK);
    }

    @GetMapping("subscribed-categories")
    public ResponseEntity<?> getSubscribedCategories(){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String userName = authentication.getName();
        return new ResponseEntity<>(userService.getSubscribedCategories(userName),HttpStatus.OK);
    }

    @GetMapping("like-log/{id}")
    public ResponseEntity<?> likePost(@PathVariable ObjectId id){
        postService.likePost(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("unlike-log/{id}")
    public ResponseEntity<?> unLikePost(@PathVariable ObjectId id){
        postService.unlikePost(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("dislike-log/{id}")
    public ResponseEntity<?> dislikePost(@PathVariable ObjectId id){
        postService.dislikePost(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("undislike-log/{id}")
    public ResponseEntity<?> unDislikePost(@PathVariable ObjectId id){
        postService.unDislikePost(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
