package com.blog.blogApp.Controller;
import com.blog.blogApp.Payloads.ApiResponse;
import com.blog.blogApp.Payloads.UserDto;
import com.blog.blogApp.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/user")
public class UserController {
   @Autowired
    UserService userService;

    @PostMapping("/")
    public ResponseEntity<UserDto> createUser(@RequestBody UserDto userDto){
        UserDto createuser=this.userService.createUser(userDto);
        return new ResponseEntity<>(createuser, HttpStatus.CREATED);
    }

    @PutMapping("/{userId}/")
    public ResponseEntity<UserDto> userUpdate(@RequestBody UserDto userDto,@PathVariable  Integer userId){
      UserDto updateuser=this.userService.UserUpadte(userDto,userId);
        return ResponseEntity.ok(updateuser);
    }

    @DeleteMapping("/{userId}")
    public ResponseEntity<UserDto> deleteuser(@PathVariable Integer userId){
        this.userService.deleteUser(userId);
        return new ResponseEntity( new ApiResponse("User deleted successfully ",true), (HttpStatusCode) HttpStatus.OK);
    }

    @GetMapping("/")
    public ResponseEntity<List<UserDto>> getallUser(){
       return ResponseEntity.ok(this.userService.getAllUser());
    }

    @GetMapping("/{userId}")
    public  ResponseEntity<UserDto> getsingleUser(@PathVariable  Integer userId){
     return ResponseEntity.ok(this.userService.getUserById(userId));
    }
}
