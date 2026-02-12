package com.example.demo.authentication.model;

import com.example.demo.user.model.User;

public class AuthenticationResponseDTO {
    private String token;
    private User userDTO;


    public void setToken(String token) {
        this.token = token;
    }

    public void setUserDTO(User userDTO) {
        this.userDTO = userDTO;
    }

    public String getToken() {
        return token;
    }

    public User getUserDTO() {
        return userDTO;
    }
}
