package com.blog.blogApp.ServiceImpl;

import com.blog.blogApp.Payloads.CommentDto;
import com.blog.blogApp.Repository.CommentRepo;
import com.blog.blogApp.Repository.PostRepo;
import com.blog.blogApp.Service.CommentService;
import com.blog.blogApp.entity.Comment;
import com.blog.blogApp.entity.Post;
import com.blog.blogApp.entity.User;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CommentServiceImpl implements CommentService {
    @Autowired
   private PostRepo postRepo;

    @Autowired
    private CommentRepo commentRepo;
    @Autowired
    private ModelMapper modelMapper;

    @Override
    public CommentDto addComment(Integer postId, CommentDto commentDto, User user) {
    Post post =postRepo.findById(postId).orElseThrow(()->new RuntimeException("Post Not Found"));
    Comment comment=modelMapper.map(commentDto, Comment.class);
    comment.setPost(post);
    comment.setUser(user);
    if(commentDto.getParentCommentId()!=null){
        Comment parent=commentRepo.findById(commentDto.getParentCommentId()).orElse(null);
        comment.setParentComment(parent);
    }
  Comment saved=commentRepo.save(comment);

    return modelMapper.map(saved,CommentDto.class);
    }

    @Override
    public List<CommentDto> getCommentByPostId(Integer postId) {
        List<Comment> comments=commentRepo.findByPostPostId(postId);
        return comments.stream().map(c->modelMapper.map(c,CommentDto.class)).collect(Collectors.toList());
    }
}
