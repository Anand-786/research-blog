package com.research_blog.research_blog.repository;

import com.research_blog.research_blog.entity.Category;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface CategoryRepository extends MongoRepository<Category, ObjectId> {
    public Category findByCategory(String category);
}
