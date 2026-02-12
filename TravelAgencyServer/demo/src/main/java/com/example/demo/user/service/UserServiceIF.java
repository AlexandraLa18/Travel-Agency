package com.example.demo.user.service;

import com.example.demo.shared.models.SearchRequestDTO;
import com.example.demo.shared.models.UsersSearchResponseDTO;
import com.example.demo.user.model.User;
import com.example.demo.user.model.UserDTO;
import org.springframework.http.ResponseEntity;

import java.util.List;
import java.util.Optional;

public interface UserServiceIF {
    User createUser(User userDTO);
    List<UserDTO> getAllUsers();
    Optional<User> getUserById(Long id);
    ResponseEntity<?> deleteUser(Long id);
    User loadUserByEmail(final String email);
    UsersSearchResponseDTO loadUsersBySearchReq(SearchRequestDTO searchRequest);

}
