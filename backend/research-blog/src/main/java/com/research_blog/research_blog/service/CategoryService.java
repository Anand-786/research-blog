package com.research_blog.research_blog.service;

import com.research_blog.research_blog.entity.Category;
import com.research_blog.research_blog.entity.Post;
import com.research_blog.research_blog.repository.CategoryRepository;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class CategoryService {
    @Autowired
    private CategoryRepository categoryRepository;

    public Category findByCategory(String category){
        return categoryRepository.findByCategory(category);
    }

    public void addPostToCategory(Post post){
        String category = post.getCategory();
        Category updatedCategory = categoryRepository.findByCategory(category);
        updatedCategory.getPosts().add(post);
        categoryRepository.save(updatedCategory);
    }

    public void deletePostById(String categoryName, String id){
        Category category = categoryRepository.findByCategory(categoryName);
        category.getPosts().removeIf(x -> x.getId().equals(id));
        categoryRepository.save(category);
    }

    public List<Category> getAllCategories(){
        return categoryRepository.findAll();
    }

    public List<Post> searchByTags(String query, String categoryName){
        List<Post> searchResults = new ArrayList<>();

        String lowerCaseQuery=query.toLowerCase();
        String[] tokenized=lowerCaseQuery.split(" ");
        List<String> token_list= Arrays.asList(tokenized);
        Set<String> token_set=new HashSet<>(token_list);

        Category category=categoryRepository.findByCategory(categoryName);
        for(Post post : category.getPosts()){
            for(String tag: post.getTags()){
                if(token_set.contains(tag.toLowerCase())){
                    searchResults.add(post);
                    break;
                }
            }
        }
        searchResults.sort((p1,p2) -> Integer.compare(p2.getLikes(),p1.getLikes()));
        return searchResults;
    }
}
