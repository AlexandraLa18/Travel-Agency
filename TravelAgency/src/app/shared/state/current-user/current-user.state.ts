import { State, Selector, Action, StateContext } from "@ngxs/store";
import { UserDTO } from "../../models/userDTO.model";
import { Injectable } from "@angular/core";
import { CurrentUserActions } from "./current-user.actions";
import { HttpErrorResponse } from "@angular/common/http";
import { take } from "rxjs";
import { AuthenticationService } from "src/app/modules/+auth/services/authentication.service";
import { CURRENT_USER_ID_SESSION_STORAGE, CURRENT_USER_ROLE_SESSION_STORAGE } from "src/app/core/storage/constants/local-storage.const";
import { SessionStorageService } from "src/app/core/storage/services/session-storage.service";

export class CurrentUserStateModel {
    user?: UserDTO;
}

const initialCurrentUserState = {
    user: undefined
};

@State<CurrentUserStateModel>({
    name: 'currentUser',
    defaults: initialCurrentUserState
})
@Injectable()
export class CurrentUserState {
    @Selector()
    static user(state: CurrentUserStateModel): UserDTO | undefined {
        return state.user;
    }

    constructor(
        private readonly _sessionStorageService: SessionStorageService,
        private readonly _authService: AuthenticationService
    ) {}

    @Action(CurrentUserActions.InitUser)
    initUser({ dispatch }: StateContext<CurrentUserStateModel>, { userId }: CurrentUserActions.InitUser): void {
        this._authService
        .findUserById(userId)
        .pipe(take(1))
        .subscribe({
            next: (response: UserDTO) => dispatch(new CurrentUserActions.InitUserSuccess(response)),
            error: (err: HttpErrorResponse) => dispatch(new CurrentUserActions.InitUserError(err))
        });
    }

    @Action(CurrentUserActions.InitUserSuccess)
    initUserSuccess({ dispatch }: StateContext<CurrentUserStateModel>, { user }: CurrentUserActions.SetCurrentUser): void {
        dispatch(new CurrentUserActions.SetCurrentUser(user));
    }

    @Action(CurrentUserActions.InitUserError)
    initUserError({ dispatch }: StateContext<CurrentUserStateModel>): void {
        dispatch(new CurrentUserActions.SetCurrentUser(undefined));
    }

    @Action(CurrentUserActions.SetCurrentUser)
    setCurrentUser({ patchState }: StateContext<CurrentUserStateModel>, { user }: CurrentUserActions.SetCurrentUser): void {
        user?.id
        ? (this._sessionStorageService.setItem(CURRENT_USER_ID_SESSION_STORAGE, user?.id),
           this._sessionStorageService.setItem(CURRENT_USER_ROLE_SESSION_STORAGE, user?.role))
        : (this._sessionStorageService.removeItem(CURRENT_USER_ID_SESSION_STORAGE),
           this._sessionStorageService.removeItem(CURRENT_USER_ROLE_SESSION_STORAGE));

        patchState({ user });
    }
}