package com.example.demo.user.model;

import com.example.demo.simpleVacation.model.SimpleVacation;
import com.example.demo.vacations.model.Vacation;
import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name="users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;
    private String email;
    private String password;
    private String role;


    public void setRole(String role) {
        this.role = role;
    }
    public String getRole() {
        return role;
    }
    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }
    public String getEmail() {
        return email;
    }
    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}

