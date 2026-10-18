package com.blog.blogApp.Payloads;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class UserDto {
    private Integer id;
    @NotEmpty(message = "Name can not be empty .")
    @Size(min = 3,message = "Name must have atleast 3 characters")
    private String name;
    @Email(message = "Invalid Email Address")
    @NotEmpty(message = "Email can not be empty")
    private String email;
    @NotEmpty(message = "Password can not be empty .")
    private  String password;
    private String about;


}
