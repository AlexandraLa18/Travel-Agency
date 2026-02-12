import { UserDTO } from "./userDTO.model";

export interface AuthenticationResponseDTO {
    userDTO: UserDTO;
    token: string;
}