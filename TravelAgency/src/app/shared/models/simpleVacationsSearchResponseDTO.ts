import { SimpleVacationDTO } from "./simpleVacationDTO";

export interface SimpleVacationSearchResponse {
  results: Array<SimpleVacationDTO>;
  total: number;
}
  