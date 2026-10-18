package com.blog.blogApp.Controller;
import com.blog.blogApp.Payloads.JwtAuthResponse;
import com.blog.blogApp.Payloads.LoginRequest;
import com.blog.blogApp.Payloads.UserDto;
import com.blog.blogApp.Service.UserService;
import com.blog.blogApp.ServiceImpl.CustomUserDetailsService;
import com.blog.blogApp.security.JwtUtil;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    UserService userService;
    @Autowired
    private CustomUserDetailsService  userDetailsService;

    @Autowired
    private JwtUtil util;
    @PostMapping("/login")
    public ResponseEntity<?> login(@Valid @RequestBody LoginRequest request){
        try{
           Authentication auth =authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(request.getUserName(),request.getPassword()));

        }catch (BadCredentialsException e){
           return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid UserName or Password");
        }
        final UserDetails userdetails =userDetailsService.loadUserByUsername(request.getUserName());
        final  String token= util.generateToken(userdetails.getUsername());
        UserDto userDto =userService.getUserByUserName(request.getUserName());
        JwtAuthResponse response=new JwtAuthResponse(token,userDto);
        return ResponseEntity.ok(response);
    }
}
