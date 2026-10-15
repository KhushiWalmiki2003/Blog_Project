package com.blog.blogApp.Payloads;

import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;
@Data
public class CommentDto {
    private Long id;
    private String content;
    private LocalDateTime createdAt;
    private Long parentCommentId;
    private  Integer postId;
    private Integer userID;
    private String userName;
    private List<CommentDto> replies;


}
