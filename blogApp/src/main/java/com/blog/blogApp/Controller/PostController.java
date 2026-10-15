package com.blog.blogApp.Controller;
import com.blog.blogApp.Payloads.PostDto;
import com.blog.blogApp.Service.PostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/posts")
public class PostController {
    @Autowired
    PostService postService;

    @PostMapping("/user/{userId}/category/{categoryId}")
    public ResponseEntity<PostDto> createPost(@RequestBody  PostDto postDto, @PathVariable Integer userId,@PathVariable Integer categoryId){
         PostDto createdpost=this.postService.createPost(postDto,userId,categoryId);
         return  new ResponseEntity<>(createdpost, HttpStatus.CREATED);
    }

    @PutMapping("/{postId}")
    public  ResponseEntity<PostDto> updatePost(@RequestBody PostDto postDto,@PathVariable Integer postId){
     PostDto updated=this.postService.updatePost(postDto,postId);
     return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/{postId}")
    public  ResponseEntity<String> deletePost(@PathVariable Integer postId){
        this.postService.deletePost(postId);
        return new ResponseEntity<>("Post Deleted Successfully",HttpStatus.OK);
    }

    @GetMapping("/{postId}")
    public  ResponseEntity<PostDto> getPostById(@PathVariable  Integer postId){
        PostDto getpostbyid=this.postService.getPostById(postId);
        return ResponseEntity.ok(getpostbyid);
    }

    @GetMapping("/")
    public ResponseEntity<List<PostDto>> getall(){
      return ResponseEntity.ok(this.postService.getAllPost());
    }




}
