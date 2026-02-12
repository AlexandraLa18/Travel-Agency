package com.example.demo.authentication.service.impl;

import com.example.demo.authentication.model.AuthenticationRequestDTO;
import com.example.demo.authentication.model.SignupRequestDTO;
import com.example.demo.authentication.service.AuthenticationServiceIF;
import com.example.demo.user.model.User;
import com.example.demo.user.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;
@Service
public class AuthenticationServiceImpl implements AuthenticationServiceIF {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;
    public AuthenticationServiceImpl(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }
    @Override
    public Optional<User> login(AuthenticationRequestDTO authenticationRequestDTO) {
        Optional<User> user = userRepository.findByEmail(authenticationRequestDTO.getEmail());
        if (user.isPresent() && passwordEncoder.matches(authenticationRequestDTO.getPassword(), user.get().getPassword())) {
            return user;
        }
        return Optional.empty();
    }

    @Override
    public Optional<User> signupUser(SignupRequestDTO request) {
        Optional<User> user = userRepository.findByEmail(request.getEmail());
        if (user.isPresent()) {
            return user;
        }
        return Optional.empty();
    }


}
