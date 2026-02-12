import { VacationDTO } from "./vacationDTO";

export interface VacationSearchResponse {
  results: Array<VacationDTO>;
  total: number;
}
