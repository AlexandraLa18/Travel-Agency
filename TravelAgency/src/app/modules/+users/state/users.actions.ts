import { HttpErrorResponse } from '@angular/common/http';
import { SearchRequestDTO } from 'src/app/shared/models/searchRequestDTO';
import { UserDTO } from 'src/app/shared/models/userDTO.model';
import { UserSearchResponse } from 'src/app/shared/models/userSearchResponse';

export namespace UsersActions {
  export class LoadUserListBySearchReq {
    static readonly type = '[Users] LoadUserListBySearchReq';
    constructor(public readonly searchReq: SearchRequestDTO) {}
  }

  export class LoadUserListBySearchReqSuccess {
    static readonly type = '[Users] LoadUserListBySearchReqSuccess';
    constructor(public readonly response: UserSearchResponse) {} 
  }

  export class LoadUserListBySearchReqError {
    static readonly type = '[Users] LoadUserListBySearchReqError';
    constructor(public readonly error: HttpErrorResponse) {}
  }
  
  export class AddUser {
    static readonly type = '[Users] AddUser';
    constructor(public readonly user: UserDTO) {}
  }

  export class AddUserSuccess {
    static readonly type = '[Users] AddUserSuccess';
  }

  export class AddUserError {
    static readonly type = '[Users] AddUserError';
    constructor(public readonly error: HttpErrorResponse) {}
  }

  export class DeleteUserById {
    static readonly type = '[Users] DeleteUserById';
    constructor(public readonly id: number | undefined | null) {}
  }

  export class DeleteUserByIdSuccess {
    static readonly type = '[Users] DeleteUserByIdSuccess';
  }

  export class DeleteUserByIdError {
    static readonly type = '[Users] DeleteUserByIdError';
    constructor(public readonly error: HttpErrorResponse) {}
  }
}
