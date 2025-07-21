package com.research_blog.research_blog.entity;

import lombok.Data;
import lombok.NonNull;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Document(collection = "posts")
@Data
public class Post {
    @Id
    private ObjectId id;
    private String author;
    @NonNull
    private String title;
    @NonNull
    private String category;
    private List<String> tags = new ArrayList<>();
    private String mainbody;
    private List<String> refs = new ArrayList<>();
    private LocalDateTime date;
    private boolean status;
    private int likes;
    private int dislikes;
    private String imgUrl;
}
