import { SearchRequestDTO } from 'src/app/shared/models/searchRequestDTO';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Select, Store } from '@ngxs/store';
import { DestinationDTO } from 'src/app/shared/models/destinationDTO';
import { DestinationsActions } from './destinations.actions';
import { DestinationState } from './destinations.state';
@Injectable({
  providedIn: 'root',
})
export class DestinationFacade {
  @Select(DestinationState.listBySearchReq)readonly destinationListBySearchReq$!: Observable<DestinationDTO[]>;
  @Select(DestinationState.destinationList)readonly destinationListS$!: Observable<DestinationDTO[]>;
  @Select(DestinationState.romaniaDestinations)readonly romaniaDestinations$!: Observable<DestinationDTO[]>;
  @Select(DestinationState.total) readonly total$!: Observable<number>;
  @Select(DestinationState.apiItems) readonly apiDestinationList$!: Observable<DestinationDTO[]>;
  @Select(DestinationState.apiTotal) readonly apiTotal$!: Observable<number>;
  @Select(DestinationState.apiLoading)readonly apiLoading$!: Observable<boolean>;
  @Select(DestinationState.apiDataNotFound)readonly apiDataNotFound$!: Observable<boolean>;
  @Select(DestinationState.worldDestinations)readonly worldsPopularDestinations$!: Observable<DestinationDTO[]>;

  constructor(private readonly _store: Store) {}

  loadDestinationList() {
    this._store.dispatch(new DestinationsActions.LoadDestinationsList());
  }

  loadApiDestinationList(name: string) {
    this._store.dispatch(new DestinationsActions.LoadApiDestinationsList(name));
  }

  loadRomaniaDestinationList() {
    this._store.dispatch(new DestinationsActions.LoadRomaniaDestinationsList());
  }

  loadWorldsPopularDestinationsList() {
    this._store.dispatch(new DestinationsActions.LoadWorldsPopularDestinationsList());
  }

  resetApiDestinationList() {
    this._store.dispatch(
      new DestinationsActions.LoadApiDestinationsListError()
    );
  }

  loadDestinationListBySearchReq(searchReq: SearchRequestDTO) {
    this._store.dispatch(
      new DestinationsActions.LoadDestinationsListBySearchReq(searchReq)
    );
  }

  deleteDestinationById(id: number) {
    this._store.dispatch(new DestinationsActions.DeleteDestinationById(id));
  }

  addDestination(destination: DestinationDTO) {
    this._store.dispatch(new DestinationsActions.AddDestination(destination));
  }
}
