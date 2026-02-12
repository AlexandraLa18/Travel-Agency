import { HttpErrorResponse } from "@angular/common/http";
import { UserDTO } from "../../models/userDTO.model";

export namespace CurrentUserActions {
    export class SetCurrentUser { 
        static readonly type = '[CurrentUser] Set Current User';
        constructor(public readonly user?: UserDTO) {}
    }

    export class InitUser {
        static readonly type = '[CurrentUser] Init User';
        constructor(public userId: number) {}
    }

    export class InitUserSuccess {
        static readonly type = '[CurrentUser] Init User Success';
        constructor(public user: UserDTO) {}
    }

    export class InitUserError { 
        static readonly type = '[CurrentUser] Init User Error';
        constructor(public err: HttpErrorResponse) {}
    }
}