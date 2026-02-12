import { UserDTO } from './userDTO.model';

export interface UserSearchResponse {
  results: Array<UserDTO>;
  total: number;
}
