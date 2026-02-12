import { Action, Selector, State, StateContext } from '@ngxs/store';
import { UserDTO } from 'src/app/shared/models/userDTO.model';
import { UsersService } from '../services/users.service';
import { Injectable } from '@angular/core';
import { SearchRequestDTO } from 'src/app/shared/models/searchRequestDTO';
import { StateMetadata } from 'src/app/shared/models/state-metadata.model';
import { UsersActions } from './users.actions';
import { UserSearchResponse } from 'src/app/shared/models/userSearchResponse';
import { HttpErrorResponse } from '@angular/common/http';
import { take } from 'rxjs';

export class UsersStateModel {
  itemList!: StateMetadata<UserDTO>;
  searchRequest!: SearchRequestDTO;
}

const initialUsersState = {
  itemList: {
    items: [],
    total: 0,
  },
  searchRequest: {},
};

@State<UsersStateModel>({
  name: 'Users',
  defaults: initialUsersState,
})
@Injectable()
export class UsersState {
  @Selector()
  static items(state: UsersStateModel): UserDTO[] {
    return state.itemList.items;
  }

  @Selector()
  static total(state: UsersStateModel): number {
    return state.itemList.total;
  }

  @Selector()
  static searchRequest(state: UsersStateModel): SearchRequestDTO {
    return state.searchRequest;
  }

  constructor(private readonly _usersService: UsersService) {}
  
  @Action(UsersActions.LoadUserListBySearchReq)
  LoadUserListBySearchReq(
    { dispatch, patchState }: StateContext<UsersStateModel>,
    { searchReq }: UsersActions.LoadUserListBySearchReq
  ): void {
    const searchRequest = {
      ...searchReq,
      sortField: searchReq.sortField ?? 'name',
      sortOrder: 'asc',
    };
    patchState({ searchRequest: searchRequest });
    this._resetMetadata(patchState);

    this._usersService
      .loadUsersBySearchReq(searchRequest)
      .pipe(take(1))
      .subscribe({
        next: (response: UserSearchResponse) =>
          dispatch(new UsersActions.LoadUserListBySearchReqSuccess(response)),
        error: (err: HttpErrorResponse) =>
          dispatch(new UsersActions.LoadUserListBySearchReqError(err)),
      });
  }

  @Action(UsersActions.LoadUserListBySearchReqSuccess)
  LoadUserListBySearchReqSuccess(
    { patchState }: StateContext<UsersStateModel>,
    { response }: UsersActions.LoadUserListBySearchReqSuccess
  ): void {
    const itemList: StateMetadata<UserDTO> = {
      items: response.results ?? [],
      total: response.results.length,
    };
    patchState({ itemList });
  }

  @Action(UsersActions.LoadUserListBySearchReqError)
  LoadUserListBySearchReqError(
    { patchState }: StateContext<UsersStateModel>,
    { error }: UsersActions.LoadUserListBySearchReqError
  ): void {
    this._resetMetadata(patchState);
  }
  @Action(UsersActions.DeleteUserById)
  DeleteUserById(
    { dispatch }: StateContext<UsersStateModel>,
    { id }: UsersActions.DeleteUserById
  ): void {
    this._usersService
      .deleteUserById(id)
      .pipe(take(1))
      .subscribe({
        next: () => dispatch(new UsersActions.DeleteUserByIdSuccess()),
        error: (err: HttpErrorResponse) =>
          dispatch(new UsersActions.DeleteUserByIdError(err)),
      });
  }

  @Action(UsersActions.DeleteUserByIdSuccess)
  DeleteUserByIdSuccess({
    dispatch,
    getState,
  }: StateContext<UsersStateModel>): void {
    const searchReq = getState().searchRequest;
    dispatch(new UsersActions.LoadUserListBySearchReq({ ...searchReq }));
  }

  @Action(UsersActions.DeleteUserByIdError)
  DeleteUserByIdError(
    { patchState }: StateContext<UsersStateModel>,
    { error }: UsersActions.DeleteUserByIdError
  ): void {}

  @Action(UsersActions.AddUser)
  AddUser(
    { dispatch }: StateContext<UsersStateModel>,
    { user }: UsersActions.AddUser
  ): void {
    this._usersService
      .addUser(user)
      .pipe(take(1))
      .subscribe({
        next: () => dispatch(new UsersActions.AddUserSuccess()),
        error: (err: HttpErrorResponse) =>
          dispatch(new UsersActions.AddUserError(err)),
      });
  }

  @Action(UsersActions.AddUserSuccess)
  AddUserSuccess({
    dispatch,
    getState,
  }: StateContext<UsersStateModel>): void {
    const searchReq = getState().searchRequest;
    dispatch(new UsersActions.LoadUserListBySearchReq({ ...searchReq }));
  }

  @Action(UsersActions.AddUserError)
  AddUserError({ error }: UsersActions.AddUserError): void {}

  private _resetMetadata(
    patchState: (val: Partial<UsersStateModel>) => UsersStateModel
  ): void {
    const itemList: StateMetadata<UserDTO> = {
      items: [],
      total: 0,
    };
    patchState({ itemList });
  }
}
