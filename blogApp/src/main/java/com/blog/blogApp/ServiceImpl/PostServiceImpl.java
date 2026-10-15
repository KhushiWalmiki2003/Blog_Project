package com.blog.blogApp.ServiceImpl;

import com.blog.blogApp.Payloads.PostDto;
import com.blog.blogApp.Repository.CategoryRepo;
import com.blog.blogApp.Repository.PostRepo;
import com.blog.blogApp.Repository.UserRepo;
import com.blog.blogApp.Service.PostService;
import com.blog.blogApp.entity.Category;
import com.blog.blogApp.entity.Post;
import com.blog.blogApp.entity.User;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class PostServiceImpl implements PostService {

    @Autowired
    UserRepo userRepo;

    @Autowired
    CategoryRepo categoryRepo;

    @Autowired
    PostRepo postRepo;

    @Autowired
    ModelMapper modelMapper;
    @Override
    public PostDto createPost(PostDto postDto, Integer userId, Integer categoryId) {
        User user =this.userRepo.findById(userId).orElseThrow(()-> new IllegalArgumentException("User Not Found with this id."+userId));
        Category category =this.categoryRepo.findById(categoryId).orElseThrow(()-> new IllegalArgumentException("Category Not found with this id"+categoryId));
        Post post=this.modelMapper.map(postDto, Post.class);
        post.setImageName("default.png");
        post.setAddedDate(new Date());
        post.setCategory(category);
        Post savedPost=this.postRepo.save(post);
        return this.modelMapper.map(savedPost,PostDto.class);
    }

    @Override
    public PostDto updatePost(PostDto postDto, Integer postId) {
        Post post=this.postRepo.findById(postId).orElseThrow(()->new IllegalArgumentException("Post is not Fetch with this Id "+postId));
        post.setTitle(postDto.getTitle());
        post.setContent(postDto.getContent());
        post.setImageName(postDto.getImageName());
        Post updatedpost=this.postRepo.save(post);
        return this.modelMapper.map(updatedpost,PostDto.class);
    }

    @Override
    public void deletePost(Integer postId) {
      Post post=this.postRepo.findById(postId).orElseThrow(()->new IllegalArgumentException("Post Id is not deleted !"+postId));
      this.postRepo.delete(post);
      return;
    }

    @Override
    public PostDto getPostById(Integer postId) {
       Post post=this.postRepo.findById(postId).orElseThrow(()->new IllegalArgumentException("PostId is not found"+postId));
        return this.modelMapper.map(post,PostDto.class);
    }

    @Override
    public List<PostDto> getAllPost() {
        List<Post> posts=this.postRepo.findAll();
        return posts.stream().map(post -> this.modelMapper.map(post,PostDto.class)).collect(Collectors.toList());
    }
}
