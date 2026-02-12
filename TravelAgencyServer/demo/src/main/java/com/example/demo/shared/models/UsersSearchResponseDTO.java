package com.example.demo.shared.models;

import com.example.demo.hotels.model.HotelDTO;
import com.example.demo.user.model.UserDTO;

import java.util.List;

public class UsersSearchResponseDTO {
        private List<UserDTO> results;
        private Long total;

    public List<UserDTO> getResults() {
        return results;
    }

    public void setResults(List<UserDTO> results) {
        this.results = results;
    }

    public Long getTotal() {
        return total;
    }

    public void setTotal(Long total) {
        this.total = total;
    }
}
