package com.research_blog.research_blog.service;

import com.research_blog.research_blog.entity.Category;
import com.research_blog.research_blog.entity.Post;
import com.research_blog.research_blog.entity.User;
import com.research_blog.research_blog.repository.UserRepository;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private CategoryService categoryService;
    @Autowired
    private PasswordEncoder passwordEncoder;

    public void saveUser(User user){
        userRepository.save(user);
    }

    public void saveNewUser(User user){
        List<String> role=new ArrayList<>();
        role.add("USER");
        user.setRoles(role);
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        userRepository.save(user);
    }

    public User findByUserName(String userName){
        return userRepository.findByUserName(userName);
    }

    public ResponseEntity<?> getAllMyPosts(String userName){
        User user = userRepository.findByUserName(userName);
        return new ResponseEntity<>(user.getMyPosts(), HttpStatus.OK);
    }

    @Transactional
    public ResponseEntity<?> subscribeToCategory(String categoryName, String userName){
        User user = userRepository.findByUserName(userName);
        Category category = categoryService.findByCategory(categoryName);
        user.getSubscribedCategories().add(category);
        userRepository.save(user);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @Transactional
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
        for(Category category : categoryService.getAllCategories()){
            if(user.getSubscribedCategories().contains(category))
                allMySubPosts.addAll(category.getPosts());
            else if(!category.getPosts().isEmpty())
                allMySubPosts.add(category.getPosts().getFirst());
        }
        return new ResponseEntity<>(allMySubPosts,HttpStatus.OK);
    }

    public void deletePostById(String userName, String id){
        User user = userRepository.findByUserName(userName);
        user.getMyPosts().removeIf(x -> x.getId().equals(id));
        userRepository.save(user);
    }
}
