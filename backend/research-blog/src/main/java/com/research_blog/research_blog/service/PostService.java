package com.research_blog.research_blog.service;

import com.research_blog.research_blog.entity.Category;
import com.research_blog.research_blog.entity.Post;
import com.research_blog.research_blog.entity.User;
import com.research_blog.research_blog.repository.PostRepository;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
public class PostService {
    @Autowired
    private PostRepository postRepository;
    @Autowired
    private UserService userService;
    @Autowired
    private CategoryService categoryService;

    public void createPost(Post post){
        post.setDate(LocalDateTime.now());
        Post savedPost = postRepository.save(post);
        User user = userService.findByUserName(post.getAuthor());
        user.getMyPosts().add(savedPost);
        categoryService.addPostToCategory(post);
        userService.saveUser(user);
    }

    public void editPost(ObjectId id,Post newPost){
        newPost.setId(id);
        postRepository.save(newPost);
    }

    public void deletePost(String userName,ObjectId id){
        userService.deletePostById(userName,id);
        Post oldPost=postRepository.findById(id).orElse(null);
        categoryService.deletePostById(oldPost.getCategory(),id);
        postRepository.deleteById(id);
    }
}
