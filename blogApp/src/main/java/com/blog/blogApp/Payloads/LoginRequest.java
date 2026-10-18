package com.blog.blogApp.Payloads;

import jakarta.validation.constraints.NotEmpty;
import lombok.Data;

@Data
public class LoginRequest {
    @NotEmpty(message = "User name can not be empty ")
    private String userName;
    @NotEmpty(message = "Password can not be empty ")
    private String password;
}
