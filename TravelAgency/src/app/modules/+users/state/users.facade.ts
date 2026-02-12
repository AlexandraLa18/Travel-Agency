import { UserDTO } from 'src/app/shared/models/userDTO.model';
import { UsersActions } from './users.actions';
import { UsersState } from './users.state';
import { Injectable } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { SearchRequestDTO } from 'src/app/shared/models/searchRequestDTO';

@Injectable({
  providedIn: 'root',
})
export class UsersFacade {
  @Select(UsersState.items) readonly usersList$!: Observable<UserDTO[]>;
  @Select(UsersState.total) readonly total$!: Observable<number>;

  constructor(private readonly _store: Store) {}

  loadUsersListBySearchReq(searchReq: SearchRequestDTO) {
    this._store.dispatch(new UsersActions.LoadUserListBySearchReq(searchReq));
  }

  deleteUserById(id: number | undefined | null) {
    this._store.dispatch(new UsersActions.DeleteUserById(id));
  }

  addUser(user: UserDTO) {
    this._store.dispatch(new UsersActions.AddUser(user));
  }
}
