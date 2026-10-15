package com.blog.blogApp.ServiceImpl;

import com.blog.blogApp.Payloads.UserDto;
import com.blog.blogApp.Repository.UserRepo;
import com.blog.blogApp.Service.UserService;
import com.blog.blogApp.entity.User;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;
@Service
public class UserServiceImpl implements UserService {
    @Autowired
     private ModelMapper modelMapper;

    @Autowired
    private UserRepo repo;

    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    @Override
    public UserDto createUser(UserDto userDto) {
        User user=this.dtoToUser(userDto);
        user.setId(null);
        user.setPassword(bCryptPasswordEncoder.encode(userDto.getPassword()));
        User savedUser=this.repo.save(user);
        return this.userToDto(savedUser);
    }

    @Override
    public UserDto UserUpadte(UserDto userDto, Integer userId) {
       User user=this.repo.findById(userId).orElseThrow(()->
               new IllegalArgumentException("User not found with this Id"+userId));
       User updatedUser=this.dtoToUser(userDto);
       updatedUser.setId(user.getId());
       User saves=this.repo.save(updatedUser);
        return this.userToDto(saves);
    }

    @Override
    public UserDto getUserById(Integer userId) {
       User user= this.repo.findById(userId).orElseThrow(()->
               new IllegalArgumentException("User is not found by this Id !"+userId));
        return this.userToDto(user);
    }

    @Override
    public List<UserDto> getAllUser() {
        List<User> userList=this.repo.findAll();
        return userList.stream()
                .map(this::userToDto)
                .collect(Collectors.toList());
    }

    @Override
    public String deleteUser(Integer userId) {
        this.repo.deleteById(userId);
        return "Id deleted successfully .";

    }

    @Override
    public UserDto getUserByUserName(String userName) {
        User user=repo.findByName(userName).orElseThrow(()->new IllegalArgumentException("UserName is not found !"+userName));
        return modelMapper.map(user,UserDto.class);
    }

    private User dtoToUser(UserDto userDto){
     return modelMapper.map(userDto,User.class);
    }

    private UserDto userToDto(User user){
        return modelMapper.map(user,UserDto.class);
    }
}
