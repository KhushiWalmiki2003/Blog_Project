package com.blog.blogApp.Payloads;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;
@Data
public class CommentDto {
    private Long id;
    @NotEmpty(message = "Comment can not be empty .")
    @Size(min = 2,message = "Comment must be at least 2 characters long .")
    private String content;
    private LocalDateTime createdAt;
    private Long parentCommentId;
    private  Integer postId;
    private Integer userID;
    private String userName;
    private List<CommentDto> replies;


}
