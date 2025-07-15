package com.research_blog.research_blog.service;

import com.research_blog.research_blog.entity.Post;
import com.research_blog.research_blog.entity.User;
import com.research_blog.research_blog.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    public void saveUser(User user){
        userRepository.save(user);
    }

    public User findByUserName(String userName){
        return userRepository.findByUserName(userName);
    }

    public ResponseEntity<?> getAllMyPosts(String userName){
        User user = userRepository.findByUserName(userName);
        return new ResponseEntity<>(user.getMyPosts(), HttpStatus.OK);
    }
}
