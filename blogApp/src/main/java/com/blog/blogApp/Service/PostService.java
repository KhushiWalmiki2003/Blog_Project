package com.blog.blogApp.Service;
import com.blog.blogApp.Payloads.PostDto;
import java.util.List;

public interface PostService {
   PostDto createPost(PostDto postDto,Integer userId,Integer categoryId);

   PostDto updatePost(PostDto  postDto,Integer postId);
   void deletePost(Integer postId);

   PostDto getPostById(Integer postId);

   List<PostDto> getAllPost();
}
