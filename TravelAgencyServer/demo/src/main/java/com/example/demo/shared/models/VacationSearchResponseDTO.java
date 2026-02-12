package com.example.demo.shared.models;

import com.example.demo.vacations.model.VacationDTO;

import java.util.List;

public class VacationSearchResponseDTO {
    private List<VacationDTO> results;
    private Long total;

    public List<VacationDTO> getResults() {
        return results;
    }

    public void setResults(List<VacationDTO> results) {
        this.results = results;
    }

    public Long getTotal() {
        return total;
    }

    public void setTotal(Long total) {
        this.total = total;
    }
}
