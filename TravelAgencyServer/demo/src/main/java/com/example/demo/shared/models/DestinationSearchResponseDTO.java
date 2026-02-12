package com.example.demo.shared.models;

import com.example.demo.destinations.model.DestinationDTO;

import java.util.List;

public class DestinationSearchResponseDTO {
    private List<DestinationDTO> results;
    private Long total;

    public List<DestinationDTO> getResults() {
        return results;
    }

    public void setResults(List<DestinationDTO> results) {
        this.results = results;
    }

    public Long getTotal() {
        return total;
    }

    public void setTotal(Long total) {
        this.total = total;
    }
}
