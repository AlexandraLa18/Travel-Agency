import { PaginationDTO } from "./paginationDTO";

export interface SearchRequestDTO {
    paginationDTO?: PaginationDTO;
    sortField?: string;
    sortOrder?: string;
}