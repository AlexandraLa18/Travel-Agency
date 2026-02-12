package com.example.demo.user.controller;

import com.example.demo.shared.models.HotelSearchResponseDTO;
import com.example.demo.shared.models.SearchRequestDTO;
import com.example.demo.shared.models.UsersSearchResponseDTO;
//import com.example.demo.simpleVacation.model.SimpleVacation;
import com.example.demo.user.model.User;
import com.example.demo.user.model.UserDTO;
import com.example.demo.user.service.UserServiceIF;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.xml.bind.ValidationException;
import java.util.List;

@RestController
@RequestMapping("/users")
public class UserController {
    private UserServiceIF userServiceIF;
    public UserController(UserServiceIF userServiceIF) {
        this.userServiceIF = userServiceIF;
    }

    @PostMapping
    public ResponseEntity<User> createUser(@RequestBody User user) {
        return new ResponseEntity<>(userServiceIF.createUser(user), HttpStatus.OK);
    }

    @GetMapping("/all")
    public ResponseEntity<List<UserDTO>> getAllUsers() {
        List<UserDTO> users = userServiceIF.getAllUsers();
        if (users.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(users, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<User> getUserById(@PathVariable Long id) {
        return userServiceIF.getUserById(id)
                .map(user -> new ResponseEntity<>(user, HttpStatus.OK))
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }


    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteUser(@PathVariable Long id) {
        return userServiceIF.deleteUser(id);
    }

    @PostMapping("/loadUsersBySearchReq")
    public ResponseEntity<UsersSearchResponseDTO> loadUsersBySearchReq(@RequestBody SearchRequestDTO searchRequest) throws ValidationException {
        return new ResponseEntity<>(userServiceIF.loadUsersBySearchReq(searchRequest), HttpStatus.OK);
    }
}

