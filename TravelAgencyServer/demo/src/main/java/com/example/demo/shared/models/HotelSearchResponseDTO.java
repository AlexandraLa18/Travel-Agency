package com.example.demo.shared.models;

import com.example.demo.hotels.model.HotelDTO;

import java.util.List;

public class HotelSearchResponseDTO {
    private List<HotelDTO> results;
    private Long total;

    public List<HotelDTO> getResults() {
        return results;
    }

    public void setResults(List<HotelDTO> results) {
        this.results = results;
    }

    public void setTotal(Long total) {
        this.total = total;
    }
}
