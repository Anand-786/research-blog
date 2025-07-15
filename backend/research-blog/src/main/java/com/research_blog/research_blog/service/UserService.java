package com.research_blog.research_blog.service;

import com.research_blog.research_blog.entity.Category;
import com.research_blog.research_blog.entity.Post;
import com.research_blog.research_blog.entity.User;
import com.research_blog.research_blog.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private CategoryService categoryService;

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

    public ResponseEntity<?> subscribeToCategory(String categoryName,String userName){
        //Change this so, we get username from authenticated context
        User user = userRepository.findByUserName(userName);
        Category category = categoryService.findByCategory(categoryName);
        user.getSubscribedCategories().add(category);
        userRepository.save(user);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    public ResponseEntity<?> unsubscribeToCategory(String categoryName,String userName){
        //Change this so, we get username from authenticated context
        User user = userRepository.findByUserName(userName);
        user.getSubscribedCategories().removeIf(x -> (x.getCategory()).equals(categoryName));
        userRepository.save(user);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    public ResponseEntity<?> getSubscribedCategories(String userName){
        User user = userRepository.findByUserName(userName);
        List<String> mySubCategories = new ArrayList<>();
        for(Category category : user.getSubscribedCategories())
                mySubCategories.add(category.getCategory());
        return new ResponseEntity<>(mySubCategories,HttpStatus.OK);
    }

    public ResponseEntity<?> getMySubscribedCategoryPosts(String userName){
        //change for user
        List<Post> allMySubPosts = new ArrayList<>();
        User user = userRepository.findByUserName(userName);
        for(Category category : user.getSubscribedCategories()){
            allMySubPosts.addAll(category.getPosts());
        }
        return new ResponseEntity<>(allMySubPosts,HttpStatus.OK);
    }
}
