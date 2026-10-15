package com.blog.blogApp.ServiceImpl;
import com.blog.blogApp.entity.User;
import com.blog.blogApp.Repository.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Collections;
@Service
public class CustomUserDetailsService implements UserDetailsService {

    @Autowired
    private UserRepo userRepo;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user =userRepo.findByName(username).orElseThrow(()->new IllegalArgumentException("Username is not Found"+username));
        return new org.springframework
                .security.
                core.
                userdetails.
                User(user.getName(),user.getPassword(), Collections.emptyList());
    }
}
