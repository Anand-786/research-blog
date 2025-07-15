package com.research_blog.research_blog.service;

import com.research_blog.research_blog.entity.Category;
import com.research_blog.research_blog.entity.Post;
import com.research_blog.research_blog.entity.User;
import com.research_blog.research_blog.repository.PostRepository;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
public class PostService {
    @Autowired
    private PostRepository postRepository;
    @Autowired
    private UserService userService;
    @Autowired
    private CategoryService categoryService;

    @Transactional
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

    @Transactional
    public void deletePost(String userName,ObjectId id){
        userService.deletePostById(userName,id);
        Post oldPost=postRepository.findById(id).orElse(null);
        categoryService.deletePostById(oldPost.getCategory(),id);
        postRepository.deleteById(id);
    }

    public ResponseEntity<?> getRandomPosts(){
        List<Post> randomPosts = new ArrayList<>();
        for(Category category : categoryService.getAllCategories()){
            if(!category.getPosts().isEmpty())
                randomPosts.add(category.getPosts().getFirst());
        }
        return new ResponseEntity<>(randomPosts, HttpStatus.OK);
    }

    public void likePost(ObjectId id){
        Post post = postRepository.findById(id).orElse(null);
        post.setLikes(post.getLikes()+1);
        postRepository.save(post);
    }

    public void unlikePost(ObjectId id){
        Post post = postRepository.findById(id).orElse(null);
        post.setLikes(post.getLikes()-1);
        postRepository.save(post);
    }

    public void dislikePost(ObjectId id){
        Post post = postRepository.findById(id).orElse(null);
        post.setDislikes(post.getDislikes()+1);
        postRepository.save(post);
    }

    public void unDislikePost(ObjectId id){
        Post post = postRepository.findById(id).orElse(null);
        post.setDislikes(post.getDislikes()-1);
        postRepository.save(post);
    }
}
