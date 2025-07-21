package com.research_blog.research_blog.controller;

import com.research_blog.research_blog.entity.User;
import com.research_blog.research_blog.service.CategoryService;
import com.research_blog.research_blog.service.PostService;
import com.research_blog.research_blog.service.UserDetailsServiceImpl;
import com.research_blog.research_blog.service.UserService;
import com.research_blog.research_blog.utils.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("public/")
public class PublicController {
    @Autowired
    private UserService userService;
    @Autowired
    private PostService postService;
    @Autowired
    private CategoryService categoryService;
    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private UserDetailsServiceImpl userDetailsServiceImpl;
    @Autowired
    private JwtUtil jwtUtil;

    @PostMapping("signup")
    public ResponseEntity<?> createUser(@RequestBody User user){
        userService.saveNewUser(user);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @PostMapping("login")
    public ResponseEntity<?> loginUser(@RequestBody User user){
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        user.getUserName(),
                        user.getPassword()));
        UserDetails userDetails = userDetailsServiceImpl.loadUserByUsername(user.getUserName());
        String jwtToken = jwtUtil.generateToken(userDetails.getUsername());
        return new ResponseEntity<>(jwtToken,HttpStatus.CREATED);
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
