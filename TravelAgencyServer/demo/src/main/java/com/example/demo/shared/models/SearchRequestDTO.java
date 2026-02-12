package com.example.demo.shared.models;

public class SearchRequestDTO {
    private PaginationDTO paginationDTO;
    private String sortField;
    private String sortOrder;

    public PaginationDTO getPaginationDTO() {
        return paginationDTO;
    }

    public void setPaginationDTO(PaginationDTO paginationDTO) {
        this.paginationDTO = paginationDTO;
    }

    public String getSortField() {
        return sortField;
    }

    public void setSortField(String sortField) {
        this.sortField = sortField;
    }

    public String getSortOrder() {
        return sortOrder;
    }

    public void setSortOrder(String sortOrder) {
        this.sortOrder = sortOrder;
    }
}
