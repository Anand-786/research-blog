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

@Document(collection = "categories")
@Data
public class Category {
    @Id
    private ObjectId id;
    @NonNull
    @Indexed(unique = true)
    private String category;
    @DBRef
    private List<Post> posts = new ArrayList<>();
}
