package com.research_blog.research_blog.service;

import com.research_blog.research_blog.entity.Post;
import com.research_blog.research_blog.entity.User;
import com.research_blog.research_blog.repository.PostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.expression.spel.ast.NullLiteral;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public class PostService {
    @Autowired
    private PostRepository postRepository;
    @Autowired
    private UserService userService;

    public void createPost(Post post){
        Post savedPost = postRepository.save(post);
        User user = userService.findByUserName(post.getAuthor());
        user.getMyPosts().add(savedPost);
        userService.saveUser(user);
    }
}
