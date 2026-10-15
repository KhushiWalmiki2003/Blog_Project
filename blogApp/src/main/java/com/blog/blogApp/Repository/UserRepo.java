package com.blog.blogApp.Repository;

import com.blog.blogApp.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepo  extends JpaRepository<User,Integer> {
    Optional<User> findByName(String name);
}
