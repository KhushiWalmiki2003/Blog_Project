package com.blog.blogApp.Service;

import com.blog.blogApp.Payloads.UserDto;

import java.util.List;

public interface UserService {
   UserDto createUser(UserDto userDto);
   UserDto UserUpadte(UserDto userDto,Integer userId);
  UserDto getUserById(Integer userId);

  List<UserDto> getAllUser();
  String deleteUser(Integer userId);
  UserDto getUserByUserName(String userName);


}
