package com.blog.blogApp.Repository;

import com.blog.blogApp.entity.Comment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.*;


@Repository
public interface CommentRepo extends JpaRepository<Comment,Long> {
    List<Comment>  findByPostPostId(Integer postId);
}
