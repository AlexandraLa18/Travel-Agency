import { DestinationDTO } from 'src/app/shared/models/destinationDTO';
import { DestinationsService } from '../services/destinations.service';
import { DestinationsActions } from './destinations.actions';
import { DestinationSearchResponse } from 'src/app/shared/models/destinationSearchResponse';
import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { State, Selector, Action, StateContext } from '@ngxs/store';
import { take } from 'rxjs';
import { SearchRequestDTO } from 'src/app/shared/models/searchRequestDTO';
import { StateMetadata } from 'src/app/shared/models/state-metadata.model';

export class DestinationStateModel {
  listBySearchReq!: StateMetadata<DestinationDTO>;
  destinationList!: StateMetadata<DestinationDTO>;
  romaniaDestinations!: StateMetadata<DestinationDTO>;
  worldDestinations!: StateMetadata<DestinationDTO>;
  searchRequest!: SearchRequestDTO;
  apiDestinations!: StateMetadata<DestinationDTO>;
}

const initialDestinationState = {
  listBySearchReq: {
    items: [],
    total: 0,
  },
  destinationList: {
    items: [],
    total: 0,
  },
  romaniaDestinations: {
    items: [],
    total: 0,
  },
  worldDestinations: {
    items: [],
    total: 0,
  },
  searchRequest: {},
  apiDestinations: {
    items: [],
    total: 0,
    loading: false,
    dataNotFound: false
  },
};

@State<DestinationStateModel>({
  name: 'destination',
  defaults: initialDestinationState,
})
@Injectable()
export class DestinationState {
  @Selector()
  static listBySearchReq(state: DestinationStateModel): DestinationDTO[] {
    return state.listBySearchReq.items;
  }

  @Selector()
  static destinationList(state: DestinationStateModel): DestinationDTO[] {
    return state.destinationList.items;
  }

  @Selector()
  static romaniaDestinations(state: DestinationStateModel): DestinationDTO[] {
    return state.romaniaDestinations.items;
  }

  @Selector()
  static worldDestinations(state: DestinationStateModel): DestinationDTO[] {
    return state.worldDestinations.items;
  }

  @Selector()
  static total(state: DestinationStateModel): number {
    return state.listBySearchReq.total;
  }

  @Selector()
  static searchRequest(state: DestinationStateModel): SearchRequestDTO {
    return state.searchRequest;
  }

  @Selector()
  static apiItems(state: DestinationStateModel): DestinationDTO[] {
    return state.apiDestinations.items;
  }

  @Selector()
  static apiTotal(state: DestinationStateModel): number {
    return state.apiDestinations.total;
  }

  @Selector()
  static apiLoading(state: DestinationStateModel): boolean | undefined {
    return state.apiDestinations.loading;
  }

  @Selector()
  static apiDataNotFound(state: DestinationStateModel): boolean | undefined {
    return state.apiDestinations.dataNotFound;
  }

  constructor(private readonly _destinationService: DestinationsService) {}

  @Action(DestinationsActions.LoadDestinationsList)
  LoadDestinationsList({
    dispatch,
  }: StateContext<DestinationStateModel>): void {
    this._destinationService
      .getAllDestinations()
      .pipe(take(1))
      .subscribe({
        next: (response: DestinationDTO[]) =>
          dispatch(
            new DestinationsActions.LoadDestinationsListSuccess(response)
          ),
        error: (err: HttpErrorResponse) =>
          dispatch(new DestinationsActions.LoadDestinationsListError(err)),
      });
  }

  @Action(DestinationsActions.LoadDestinationsListSuccess)
  LoadDestinationsListSuccess(
    { patchState }: StateContext<DestinationStateModel>,
    { response }: DestinationsActions.LoadDestinationsListSuccess
  ): void {
    const destinationList: StateMetadata<DestinationDTO> = {
      items: response ?? [],
      total: response.length,
    };
    patchState({ destinationList });
  }

  @Action(DestinationsActions.LoadDestinationsListError)
  LoadDestinationsListError(
    { patchState }: StateContext<DestinationStateModel>,
    { error }: DestinationsActions.LoadDestinationsListError
  ): void {
    const destinationList: StateMetadata<DestinationDTO> = {
      items: [],
      total: 0,
    };
    patchState({ destinationList });
  }

  @Action(DestinationsActions.LoadApiDestinationsList)
  LoadApiDestinationsList(
    ctx: StateContext<DestinationStateModel>,
    { name }: DestinationsActions.LoadApiDestinationsList
  ): void {
    const state = ctx.getState();
    ctx.patchState({
      apiDestinations: {
        ...state.apiDestinations,
        loading: true,
      },
    });
    this._destinationService
      .requestApiDestinations(name)
      .pipe(take(1))
      .subscribe({
        next: (response: DestinationDTO[]) =>
          ctx.dispatch(
            new DestinationsActions.LoadApiDestinationsListSuccess(response)
          ),
        error: (err: HttpErrorResponse) =>
          ctx.dispatch(new DestinationsActions.LoadApiDestinationsListError()),
      });
  }

  @Action(DestinationsActions.LoadApiDestinationsListSuccess)
  LoadApiDestinationsListSuccess(
    { patchState }: StateContext<DestinationStateModel>,
    { response }: DestinationsActions.LoadApiDestinationsListSuccess
  ): void {
    const apiDestinations: StateMetadata<DestinationDTO> = {
      items: response ?? [],
      total: response.length,
      loading: false,
      dataNotFound: response.length ? false : true
    };
    patchState({ apiDestinations });
  }

  @Action(DestinationsActions.LoadApiDestinationsListError)
  LoadApiDestinationsListError(
    { patchState }: StateContext<DestinationStateModel>
  ): void {
    const apiDestinations: StateMetadata<DestinationDTO> = {
      items: [],
      total: 0,
      loading: false,
      dataNotFound: false
    };
    patchState({ apiDestinations });
  }

  @Action(DestinationsActions.LoadDestinationsListBySearchReq)
  LoadDestinationsListBySearchReq(
    { dispatch, patchState }: StateContext<DestinationStateModel>,
    { searchReq }: DestinationsActions.LoadDestinationsListBySearchReq
  ): void {
    const searchRequest = {
      ...searchReq,
      sortField: searchReq.sortField ?? 'name',
      sortOrder: 'asc',
    };
    patchState({ searchRequest: searchRequest });
    this._resetMetadata(patchState);

    this._destinationService
      .loadDestinationsBySearchReq(searchRequest)
      .pipe(take(1))
      .subscribe({
        next: (response: DestinationSearchResponse) =>
          dispatch(
            new DestinationsActions.LoadDestinationsListBySearchReqSuccess(
              response
            )
          ),
        error: (err: HttpErrorResponse) =>
          dispatch(
            new DestinationsActions.LoadDestinationsListBySearchReqError(err)
          ),
      });
  }

  @Action(DestinationsActions.LoadDestinationsListBySearchReqSuccess)
  LoadDestinationsListBySearchReqSuccess(
    { patchState }: StateContext<DestinationStateModel>,
    { response }: DestinationsActions.LoadDestinationsListBySearchReqSuccess
  ): void {
    const listBySearchReq: StateMetadata<DestinationDTO> = {
      items: response.results ?? [],
      total: response.total ?? 0,
    };
    patchState({ listBySearchReq });
  }

  @Action(DestinationsActions.LoadDestinationsListBySearchReqError)
  LoadDestinationsListBySearchReqError(
    { patchState }: StateContext<DestinationStateModel>,
    { error }: DestinationsActions.LoadDestinationsListBySearchReqError
  ): void {
    this._resetMetadata(patchState);
  }

  @Action(DestinationsActions.LoadRomaniaDestinationsList)
  LoadRomaniaDestinationsList({
    dispatch,
  }: StateContext<DestinationStateModel>): void {
    this._destinationService
      .getRomaniaDestinations()
      .pipe(take(1))
      .subscribe({
        next: (response: DestinationDTO[]) =>
          dispatch(
            new DestinationsActions.LoadRomaniaDestinationsListSuccess(response)
          ),
        error: (err: HttpErrorResponse) =>
          dispatch(new DestinationsActions.LoadRomaniaDestinationsListError(err)),
      });
  }

  @Action(DestinationsActions.LoadRomaniaDestinationsListSuccess)
  LoadRomaniaDestinationsListSuccess(
    { patchState }: StateContext<DestinationStateModel>,
    { response }: DestinationsActions.LoadRomaniaDestinationsListSuccess
  ): void {
    const romaniaDestinations: StateMetadata<DestinationDTO> = {
      items: response ?? [],
      total: response.length,
    };
    patchState({ romaniaDestinations });
  }

  @Action(DestinationsActions.LoadRomaniaDestinationsListError)
  LoadRomaniaDestinationsListError(
    { patchState }: StateContext<DestinationStateModel>,
    { error }: DestinationsActions.LoadRomaniaDestinationsListError
  ): void {
    const romaniaDestinations: StateMetadata<DestinationDTO> = {
      items: [],
      total: 0,
    };
    patchState({ romaniaDestinations });
  }

  @Action(DestinationsActions.LoadWorldsPopularDestinationsList)
  LoadWorldsPopularDestinationsList({
    dispatch,
  }: StateContext<DestinationStateModel>): void {
    this._destinationService
      .getWorldsPopularDestinations()
      .pipe(take(1))
      .subscribe({
        next: (response: DestinationDTO[]) =>
          dispatch(
            new DestinationsActions.LoadWorldsPopularDestinationsListSuccess(response)
          ),
        error: (err: HttpErrorResponse) =>
          dispatch(new DestinationsActions.LoadWorldsPopularDestinationsListError(err)),
      });
  }

  @Action(DestinationsActions.LoadWorldsPopularDestinationsListSuccess)
  LoadWorldsPopularDestinationsListSuccess(
    { patchState }: StateContext<DestinationStateModel>,
    { response }: DestinationsActions.LoadWorldsPopularDestinationsListSuccess
  ): void {
    const worldDestinations: StateMetadata<DestinationDTO> = {
      items: response ?? [],
      total: response.length,
    };
    patchState({ worldDestinations });
  }

  @Action(DestinationsActions.LoadWorldsPopularDestinationsListError)
  LoadWorldsPopularDestinationsListError(
    { patchState }: StateContext<DestinationStateModel>,
    { error }: DestinationsActions.LoadWorldsPopularDestinationsListError
  ): void {
    const worldDestinations: StateMetadata<DestinationDTO> = {
      items: [],
      total: 0,
    };
    patchState({ worldDestinations });
  }

  @Action(DestinationsActions.AddDestination)
  AddDestination(
    { dispatch }: StateContext<DestinationStateModel>,
    { destination }: DestinationsActions.AddDestination
  ): void {
    this._destinationService
      .addDestination(destination)
      .pipe(take(1))
      .subscribe({
        next: () => dispatch(new DestinationsActions.AddDestinationSuccess()),
        error: (err: HttpErrorResponse) =>
          dispatch(new DestinationsActions.AddDestinationError(err)),
      });
  }

  @Action(DestinationsActions.AddDestinationSuccess)
  AddDestinationSuccess({
    dispatch,
    getState,
  }: StateContext<DestinationStateModel>): void {
    const searchReq = getState().searchRequest;
    dispatch([
      new DestinationsActions.LoadDestinationsList(),
      new DestinationsActions.LoadDestinationsListBySearchReq({ ...searchReq }),
    ]);
  }

  @Action(DestinationsActions.AddDestinationError)
  AddDestinationError({
    error,
  }: DestinationsActions.LoadDestinationsListError): void {}

  @Action(DestinationsActions.DeleteDestinationById)
  DeleteDestinationById(
    { dispatch }: StateContext<DestinationStateModel>,
    { id }: DestinationsActions.DeleteDestinationById
  ): void {
    this._destinationService
      .deleteDestinationById(id)
      .pipe(take(1))
      .subscribe({
        next: () =>
          dispatch(new DestinationsActions.DeleteDestinationByIdSuccess()),
        error: (err: HttpErrorResponse) =>
          dispatch(new DestinationsActions.DeleteDestinationByIdError(err)),
      });
  }

  @Action(DestinationsActions.DeleteDestinationByIdSuccess)
  DeleteDestinationByIdSuccess({
    dispatch,
    getState,
  }: StateContext<DestinationStateModel>): void {
    const searchReq = getState().searchRequest;
    dispatch(
      new DestinationsActions.LoadDestinationsListBySearchReq({ ...searchReq })
    );
  }

  @Action(DestinationsActions.DeleteDestinationByIdError)
  DeleteDestinationByIdError(
    { patchState }: StateContext<DestinationStateModel>,
    { error }: DestinationsActions.DeleteDestinationByIdError
  ): void {}

  private _resetMetadata(
    patchState: (val: Partial<DestinationStateModel>) => DestinationStateModel
  ): void {
    const listBySearchReq: StateMetadata<DestinationDTO> = {
      items: [],
      total: 0,
    };
    patchState({ listBySearchReq });
  }

  private _resetApiMetadata (patchState: (val: Partial<DestinationStateModel>) => DestinationStateModel): void {
    const apiDestinations: StateMetadata<DestinationDTO> = {
      items: [],
      total: 0,
      loading: false,
      dataNotFound: false
    };
    patchState({ apiDestinations });
  }
}
