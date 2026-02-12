package com.example.demo.authentication.controller;
import com.example.demo.authentication.model.AuthenticationRequestDTO;
import com.example.demo.authentication.model.AuthenticationResponseDTO;
import com.example.demo.authentication.model.SignupRequestDTO;
import com.example.demo.authentication.service.AuthenticationServiceIF;
import com.example.demo.config.utility.JwtUtility;
import com.example.demo.user.model.User;
import com.example.demo.user.service.impl.UserServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Collections;
import java.util.Optional;

@RestController
@RequestMapping("/auth")
public class AuthenticationController {
    private AuthenticationServiceIF authenticationServiceIF;
    private UserServiceImpl userService;
    @Autowired
    private JwtUtility jwtUtility;
    private PasswordEncoder passwordEncoder;

    public AuthenticationController(AuthenticationServiceIF authenticationServiceIF, UserServiceImpl userService, JwtUtility jwtUtility, PasswordEncoder passwordEncoder) {
        this.authenticationServiceIF = authenticationServiceIF;
        this.userService = userService;
        this.jwtUtility = jwtUtility;
        this.passwordEncoder = passwordEncoder;
    }
    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody AuthenticationRequestDTO request) {
        Optional<User> authenticatedUser = authenticationServiceIF.login(request);

        if (authenticatedUser.isPresent()) {
            final String jwtToken = jwtUtility.generateToken(authenticatedUser.get().getEmail());
            AuthenticationResponseDTO authenticationResponseDTO = new AuthenticationResponseDTO();
            authenticationResponseDTO.setUserDTO(authenticatedUser.get());
            authenticationResponseDTO.setToken(jwtToken);
            return new ResponseEntity<>(authenticationResponseDTO, HttpStatus.OK);
        } else {
            return ResponseEntity.badRequest().body(Collections.singletonMap("message", "User not found or credentials are incorrect."));
        }
    }
    @PostMapping("/signup")
    public ResponseEntity<?> signupUser(@RequestBody SignupRequestDTO request) {
        Optional<User> user = authenticationServiceIF.signupUser(request);

        if (user.isPresent()) {
            return ResponseEntity.badRequest().body(Collections.singletonMap("message", "The account already exists."));
        } else {
            User newUser = new User();
            newUser.setEmail(request.getEmail());
            newUser.setPassword(request.getPassword()); // encode the password
            newUser.setRole(request.getRole());
            this.userService.createUser(newUser);

            final String jwtToken = jwtUtility.generateToken(request.getEmail());
            AuthenticationResponseDTO authenticationResponseDTO = new AuthenticationResponseDTO();
            authenticationResponseDTO.setUserDTO(newUser);
            authenticationResponseDTO.setToken(jwtToken);
            return new ResponseEntity<>(authenticationResponseDTO, HttpStatus.OK);
        }
    }

    // google sign-in: if the email doesn't exist in the db, create it (later: create it with empty app data for user, same for signup)
    @PostMapping("/googlelogin")
    public ResponseEntity<?> googlelogin(@RequestBody AuthenticationRequestDTO request) {
        Optional<User> authenticatedUser = authenticationServiceIF.login(request);

        if (authenticatedUser.isPresent()) {
            final String jwtToken = jwtUtility.generateToken(authenticatedUser.get().getEmail());
            AuthenticationResponseDTO authenticationResponseDTO = new AuthenticationResponseDTO();
            authenticationResponseDTO.setUserDTO(authenticatedUser.get());
            authenticationResponseDTO.setToken(jwtToken);
            return new ResponseEntity<>(authenticationResponseDTO, HttpStatus.OK);
        } else {
            User newUser = new User();
            newUser.setEmail(request.getEmail());
            newUser.setPassword(request.getPassword());
            newUser.setRole("USER");
            this.userService.createUser(newUser);

            final String jwtToken = jwtUtility.generateToken(request.getEmail());
            AuthenticationResponseDTO authenticationResponseDTO = new AuthenticationResponseDTO();
            authenticationResponseDTO.setUserDTO(newUser);
            authenticationResponseDTO.setToken(jwtToken);
            return new ResponseEntity<>(authenticationResponseDTO, HttpStatus.OK);        }
    }

}
