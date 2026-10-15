package com.blog.blogApp.Service;

import com.blog.blogApp.Payloads.CommentDto;
import com.blog.blogApp.entity.User;

import java.util.List;

public interface CommentService {
  CommentDto addComment(Integer postId, CommentDto commentDto, User user);
  List<CommentDto> getCommentByPostId(Integer postId);

}
