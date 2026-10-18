package com.blog.blogApp.Exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.util.HashMap;
import java.util.Map;

@ControllerAdvice
public class GlobalExceptionHandler {
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<Map<String,String>> handleValidationError(MethodArgumentNotValidException ex){
        Map<String,String> response= new HashMap<>();
        ex.getBindingResult().getFieldErrors().forEach(error->{
            String filedname=error.getField();
            String  message=error.getDefaultMessage();
            response.put(filedname,message);

        });
        return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
    }


}
