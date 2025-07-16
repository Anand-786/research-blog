package com.research_blog.research_blog.controller;

import com.research_blog.research_blog.entity.User;
import com.research_blog.research_blog.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("admin/")
public class AdminController {
    @Autowired
    private UserRepository userRepository;

    @GetMapping("all-users")
    public ResponseEntity<?> getAllUsers(){
        return new ResponseEntity<>(userRepository.findAll(), HttpStatus.OK);
    }

    @PutMapping("create-admin")
    public ResponseEntity<?> createAdmin(@RequestBody Map<String, String> user){
        String userName=user.get("username");
        User olduser = userRepository.findByUserName(userName);
        olduser.getRoles().add("ADMIN");
        userRepository.save(olduser);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }
}
