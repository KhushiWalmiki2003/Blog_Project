
package com.blog.blogApp.Controller;

import com.blog.blogApp.Payloads.CommentDto;
import com.blog.blogApp.Service.CommentService;
import com.blog.blogApp.Repository.UserRepo;
import com.blog.blogApp.entity.User;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/comments")
public class CommentController {

    @Autowired
    private CommentService commentService;

    @Autowired
    private UserRepo userRepo;

    @PostMapping("/{postId}")
    public ResponseEntity<?> addComment(
            @PathVariable Integer postId,
            @RequestBody CommentDto commentDto,
            @AuthenticationPrincipal UserDetails userDetails) {

        if (userDetails == null) {
            return ResponseEntity
                    .status(HttpStatus.UNAUTHORIZED)
                    .body("Login required to comment");
        }

        User user = userRepo.findByName(userDetails.getUsername())
                .orElse(null);

        if (user == null) {
            return ResponseEntity
                    .status(HttpStatus.UNAUTHORIZED)
                    .body("User not found");
        }

        CommentDto savedComment =
                commentService.addComment(postId, commentDto, user);

        return ResponseEntity.ok(savedComment);
    }

    @GetMapping("/{postId}")
    public ResponseEntity<List<CommentDto>> getComments(
            @PathVariable Integer postId) {

        List<CommentDto> comments =
                commentService.getCommentByPostId(postId);

        return ResponseEntity.ok(comments);
    }
}
