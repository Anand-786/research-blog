package com.research_blog.research_blog.entity;

import lombok.Data;
import lombok.NonNull;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;
import java.util.List;

@Document(collection = "users")
@Data
public class User {
    @Id
    private ObjectId id;
    @NonNull
    @Indexed(unique = true)
    private String userName;
    @NonNull
    private String password;
    @DBRef
    private List<Post> myPosts = new ArrayList<>();
    @DBRef
    private List<Category> subscribedCategories = new ArrayList<>();
    private List<String> roles = new ArrayList<>();
    @DBRef
    private List<Post> bookmarks = new ArrayList<>();
}
