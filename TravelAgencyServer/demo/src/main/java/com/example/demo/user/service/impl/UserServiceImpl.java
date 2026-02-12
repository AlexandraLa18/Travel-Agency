package com.example.demo.user.service.impl;

import com.example.demo.shared.models.SearchRequestDTO;
import com.example.demo.shared.models.UsersSearchResponseDTO;
import com.example.demo.user.mapper.UserMapper;
import com.example.demo.user.model.User;
import com.example.demo.user.model.UserDTO;
import com.example.demo.user.repository.UserRepository;
import com.example.demo.user.service.UserServiceIF;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class UserServiceImpl implements UserServiceIF {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;
    public UserServiceImpl(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public User createUser(User userDTO) {
        userDTO.setPassword(passwordEncoder.encode(userDTO.getPassword())); // Encode the password
        return userRepository.saveAndFlush(userDTO);
    }

    @Override
    public List<UserDTO> getAllUsers() {

        List<User> users = userRepository.findAll();
        return users.stream().map(user -> UserMapper.toDTO(user)).collect(Collectors.toList());
    }

    private UserDTO convertToDTO(User user) {
        UserDTO dto = new UserDTO();
        dto.setId(user.getId());
        dto.setEmail(user.getEmail());
        // Initialize and convert lists if necessary, or handle them according to your needs
        return dto;
    }
    @Override
    public Optional<User> getUserById(Long id) {
        return userRepository.findById(id);
    }

    @Override
    public ResponseEntity<?> deleteUser(Long id) {
        if (userRepository.existsById(id)) {
            userRepository.deleteById(id);
            return new ResponseEntity<>(HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @Override
    public User loadUserByEmail(String email) {
        return userRepository.findByEmail(email).orElseThrow(
                () -> new EntityNotFoundException(
                        String.format("No user was found with " + "email: %s!", email)
                ));
    }

    @Override
    public UsersSearchResponseDTO loadUsersBySearchReq(SearchRequestDTO searchRequest) {
        Pageable pageable = PageRequest.of(
                searchRequest.getPaginationDTO().getPage(),
                searchRequest.getPaginationDTO().getPageSize()
        );

        Page<User> userPage = userRepository.findAll(pageable);
        Page<UserDTO> dtoPage = userPage.map(UserMapper::toDTO);

        final UsersSearchResponseDTO responseDTO = new UsersSearchResponseDTO();
        responseDTO.setResults(dtoPage.getContent());
        responseDTO.setTotal(dtoPage.getTotalElements());

        return responseDTO;
    }

//    private UserDTO convertToUserDTO(User user) {
//        UserDTO dto = new UserDTO();
//        dto.setId(user.getId());
//        dto.setEmail(user.getEmail());
//        dto.setPassword(user.getPassword());
//        dto.setRole(user.getRole());
//        return dto;
//    }
}
