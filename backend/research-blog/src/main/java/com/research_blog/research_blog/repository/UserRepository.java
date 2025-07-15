package com.research_blog.research_blog.repository;

import com.research_blog.research_blog.entity.User;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface UserRepository extends MongoRepository<User, ObjectId> {
    public User findByUserName(String userName);
}
