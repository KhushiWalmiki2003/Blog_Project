package com.blog.blogApp.Payloads;

import jakarta.validation.constraints.NotEmpty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
@Data
@AllArgsConstructor
@NoArgsConstructor
public class PostDto {
    private  Integer postId;
    @NotEmpty(message = "Title must be not be empty")
    private  String title;
    @NotEmpty(message = "Content must be not be empty")
    private String content;
    private String imageName;
    private Date addedDate;
    private UserDto user;
    private CategoryDto categoryDto;
}
