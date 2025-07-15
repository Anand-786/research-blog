package com.research_blog.research_blog.service;

import com.research_blog.research_blog.entity.Category;
import com.research_blog.research_blog.entity.Post;
import com.research_blog.research_blog.repository.CategoryRepository;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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

    public void deletePostById(String categoryName, ObjectId id){
        Category category = categoryRepository.findByCategory(categoryName);
        category.getPosts().removeIf(x -> x.getId().equals(id));
        categoryRepository.save(category);
    }
}
