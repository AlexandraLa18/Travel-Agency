package com.example.demo.authentication.service;

import com.example.demo.authentication.model.AuthenticationRequestDTO;
import com.example.demo.authentication.model.SignupRequestDTO;
import com.example.demo.user.model.User;

import java.util.Optional;

public interface AuthenticationServiceIF {
    Optional<User> login(AuthenticationRequestDTO authenticationRequestDTO);
    Optional<User> signupUser(SignupRequestDTO request);
}
