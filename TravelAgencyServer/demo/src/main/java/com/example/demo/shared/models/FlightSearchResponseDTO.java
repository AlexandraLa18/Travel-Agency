package com.example.demo.shared.models;

import com.example.demo.flights.model.FlightDTO;

import java.util.List;

public class FlightSearchResponseDTO {
    private List<FlightDTO> results;
    private Long total;

    public List<FlightDTO> getResults() {
        return results;
    }

    public Long getTotal() {
        return total;
    }

    public void setResults(List<FlightDTO> results) {
        this.results = results;
    }

    public void setTotal(Long total) {
        this.total = total;
    }
}
