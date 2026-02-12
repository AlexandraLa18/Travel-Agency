import { Injectable } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { CurrentUserState } from './current-user.state';
import { Observable } from 'rxjs';
import { UserDTO } from '../../models/userDTO.model';
import { CurrentUserActions } from './current-user.actions';

@Injectable({
  providedIn: 'root',
})
export class CurrentUserFacade {
  @Select(CurrentUserState.user) readonly userDetails$!: Observable<
    UserDTO | undefined
  >;

  get userDetailsSnapshot(): UserDTO | null | undefined {
    return this._store.selectSnapshot(CurrentUserState.user);
  }

  constructor(private readonly _store: Store) {}

  setCurrentUser(user: UserDTO): void {
    this._store.dispatch(new CurrentUserActions.SetCurrentUser(user));
  }

  initUser(userId?: number): void {
    if (!userId) return;
    this._store.dispatch(new CurrentUserActions.InitUser(userId));
  }
}
