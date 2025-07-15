package com.research_blog.research_blog.repository;

import com.research_blog.research_blog.entity.Post;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface PostRepository extends MongoRepository<Post, ObjectId> {
}
