package com.example.demo.shared.models;

import com.example.demo.simpleVacation.model.SimpleVacationDTO;
import com.example.demo.vacations.model.VacationDTO;

import java.util.List;

public class SimpleVacationSearchResponseDTO {
    private List<SimpleVacationDTO> results;
    private Long total;

    public List<SimpleVacationDTO> getResults() {
        return results;
    }

    public void setResults(List<SimpleVacationDTO> results) {
        this.results = results;
    }

    public Long getTotal() {
        return total;
    }

    public void setTotal(Long total) {
        this.total = total;
    }
}
