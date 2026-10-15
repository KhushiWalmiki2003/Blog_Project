package com.blog.blogApp.Payloads;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
@Data
@AllArgsConstructor
@NoArgsConstructor
public class PostDto {
    private  Integer postId;
    private  String title;
    private String content;
    private String imageName;
    private Date addedDate;
    private UserDto user;
    private CategoryDto categoryDto;
}
