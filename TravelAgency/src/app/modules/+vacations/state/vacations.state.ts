import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { VacationDTO } from 'src/app/shared/models/vacationDTO';
import { VacationsActions } from './vacations.actions';
import { VacationsService } from '../services/vacations.service';
import { SearchRequestDTO } from 'src/app/shared/models/searchRequestDTO';
import { StateMetadata } from 'src/app/shared/models/state-metadata.model';
import { VacationSearchResponse } from 'src/app/shared/models/vacationSearchResponseDTO';
import { HttpErrorResponse } from '@angular/common/http';
import { take } from 'rxjs';
import { SimpleVacationDTO } from 'src/app/shared/models/simpleVacationDTO';
import { SimpleVacationService } from '../services/simple-vacation.service';
import { SimpleVacationSearchResponse } from 'src/app/shared/models/simpleVacationsSearchResponseDTO';
import { SimpleVacationSearchReq } from 'src/app/shared/models/simpleVacationSearchReq';
import { VacationSearchReq } from 'src/app/shared/models/vacationSearchReq';

export class VacationsStateModel {
  itemList!: StateMetadata<VacationDTO>;
  simpleVacationsList!: StateMetadata<SimpleVacationDTO>;
  searchRequest!: SearchRequestDTO;
  searchRequestSimpleVacation!: SearchRequestDTO;
  vacationsByCity!: StateMetadata<VacationDTO>;
  vacationsByCityPeriodAdults!: StateMetadata<VacationDTO>;
  simpleVacationsByCity!: StateMetadata<SimpleVacationDTO>;
  simpleVacationsByCityPeriodAdults!: StateMetadata<SimpleVacationDTO>;
  currentCity!: string;
  currentCity2!: string;
  simpleVacationSearchReq!: SimpleVacationSearchReq;
  vacationSearchReq!: VacationSearchReq;
}

const initialVacationsState = {
  itemList: {
    items: [],
    total: 0,
  },
  simpleVacationsList: {
    items: [],
    total: 0,
  },
  vacationsByCity: {
    items: [],
    total: 0,
  },
  vacationsByCityPeriodAdults: {
    items: [],
    total: 0,
  },
  simpleVacationsByCity: {
    items: [],
    total: 0,
  },
  simpleVacationsByCityPeriodAdults: {
    items: [],
    total: 0,
  },
  searchRequest: {},
  searchRequestSimpleVacation: {},
  currentCity: '',
  currentCity2: '',
  simpleVacationSearchReq: {},
  vacationSearchReq: {},
};

@State<VacationsStateModel>({
  name: 'Vacations',
  defaults: initialVacationsState,
})
@Injectable()
export class VacationsState {
  @Selector()
  static items(state: VacationsStateModel): VacationDTO[] {
    return state.itemList.items;
  }

  @Selector()
  static total(state: VacationsStateModel): number {
    return state.itemList.total;
  }

  @Selector()
  static simpleVacationsItems(state: VacationsStateModel): SimpleVacationDTO[] {
    return state.simpleVacationsList.items;
  }

  @Selector()
  static Stotal(state: VacationsStateModel): number {
    return state.simpleVacationsList.total;
  }

  @Selector()
  static searchRequest(state: VacationsStateModel): SearchRequestDTO {
    return state.searchRequest;
  }

  @Selector()
  static searchRequestSimpleVacation(
    state: VacationsStateModel
  ): SearchRequestDTO {
    return state.searchRequestSimpleVacation;
  }

  @Selector()
  static vacationsByCity(state: VacationsStateModel): VacationDTO[] {
    return state.vacationsByCity.items;
  }

  @Selector()
  static vacationsByCityPeriodAdults(
    state: VacationsStateModel
  ): VacationDTO[] {
    return state.vacationsByCityPeriodAdults.items;
  }

  @Selector()
  static simpleVacationsByCity(
    state: VacationsStateModel
  ): SimpleVacationDTO[] {
    return state.simpleVacationsByCity.items;
  }

  @Selector()
  static simpleVacationsByCityPeriodAdults(
    state: VacationsStateModel
  ): VacationDTO[] {
    return state.simpleVacationsByCityPeriodAdults.items;
  }

  constructor(
    private readonly _vacationsService: VacationsService,
    private readonly _simpleVacationsService: SimpleVacationService
  ) {}


  @Action(VacationsActions.LoadVacationListBySearchReq)
  LoadVacationListBySearchReq(
    { dispatch, patchState }: StateContext<VacationsStateModel>,
    { searchReq }: VacationsActions.LoadVacationListBySearchReq
  ): void {
    const searchRequest = {
      ...searchReq,
      sortField: searchReq.sortField ?? 'name',
      sortOrder: 'asc',
    };
    patchState({ searchRequest: searchRequest });
    this._resetMetadata(patchState);

    this._vacationsService
      .loadVacationsBySearchReq(searchRequest)
      .pipe(take(1))
      .subscribe({
        next: (response: VacationSearchResponse) =>
          dispatch(
            new VacationsActions.LoadVacationListBySearchReqSuccess(response)
          ),
        error: (err: HttpErrorResponse) =>
          dispatch(new VacationsActions.LoadVacationListBySearchReqError(err)),
      });
  }

  @Action(VacationsActions.LoadVacationListBySearchReqSuccess)
  LoadVacationListBySearchReqSuccess(
    { patchState }: StateContext<VacationsStateModel>,
    { response }: VacationsActions.LoadVacationListBySearchReqSuccess
  ): void {
    const itemList: StateMetadata<VacationDTO> = {
      items: response.results ?? [],
      total: response.results.length,
    };
    patchState({ itemList });
  }

  @Action(VacationsActions.LoadVacationListBySearchReqError)
  LoadVacationListBySearchReqError(
    { patchState }: StateContext<VacationsStateModel>,
    { error }: VacationsActions.LoadVacationListBySearchReqError
  ): void {
    this._resetMetadata(patchState);
  }

  @Action(VacationsActions.LoadVacationsByCityList)
  LoadVacationsByCityList(
    { dispatch }: StateContext<VacationsStateModel>,
    { cityName }: VacationsActions.LoadVacationsByCityList
  ): void {
    this._vacationsService
      .getVacationsByCity(cityName)
      .pipe(take(1))
      .subscribe({
        next: (response: VacationDTO[]) =>
          dispatch(
            new VacationsActions.LoadVacationsByCityListSuccess(
              response,
              cityName
            )
          ),
        error: (err: HttpErrorResponse) =>
          dispatch(new VacationsActions.LoadVacationsByCityListError()),
      });
  }

  @Action(VacationsActions.LoadVacationsByCityListSuccess)
  LoadVacationsByCityListSuccess(
    { patchState }: StateContext<VacationsStateModel>,
    { response, cityName }: VacationsActions.LoadVacationsByCityListSuccess
  ): void {
    const vacationsByCity: StateMetadata<VacationDTO> = {
      items: response ?? [],
      total: response.length,
    };
    patchState({ vacationsByCity, currentCity2: cityName });
  }

  @Action(VacationsActions.LoadVacationsByCityListError)
  LoadVacationsByCityListError(
    { patchState }: StateContext<VacationsStateModel>
  ): void {
    const vacationsByCity: StateMetadata<VacationDTO> = {
      items: [],
      total: 0,
    };
    patchState({ vacationsByCity, currentCity2: '' });
  }

  @Action(VacationsActions.LoadVacationsByCityPeriodAdults)
  LoadVacationsByCityPeriodAdults(
    { dispatch }: StateContext<VacationsStateModel>,
    { vacationSearchReq }: VacationsActions.LoadVacationsByCityPeriodAdults
  ): void {
    this._vacationsService
      .getVacationsByCityPeriodAdults(vacationSearchReq)
      .pipe(take(1))
      .subscribe({
        next: (response: VacationDTO[]) =>
          dispatch(
            new VacationsActions.LoadVacationsByCityPeriodAdultsSuccess(
              response,
              vacationSearchReq
            )
          ),
        error: (err: HttpErrorResponse) =>
          dispatch(
            new VacationsActions.LoadVacationsByCityPeriodAdultsError()
          ),
      });
  }

  @Action(VacationsActions.LoadVacationsByCityPeriodAdultsSuccess)
  LoadVacationsByCityPeriodAdultsSuccess(
    { patchState }: StateContext<VacationsStateModel>,
    {
      response,
      vacationSearchReq,
    }: VacationsActions.LoadVacationsByCityPeriodAdultsSuccess
  ): void {
    const vacationsByCityPeriodAdults: StateMetadata<VacationDTO> = {
      items: response ?? [],
      total: response.length,
    };
    patchState({ vacationsByCityPeriodAdults, vacationSearchReq });
  }

  @Action(VacationsActions.LoadVacationsByCityPeriodAdultsError)
  LoadVacationsByCityPeriodAdultsError(
    { patchState }: StateContext<VacationsStateModel>,
  ): void {
    const vacationsByCityPeriodAdults: StateMetadata<VacationDTO> = {
      items: [],
      total: 0,
    };
    patchState({ vacationsByCityPeriodAdults, vacationSearchReq: {} });
  }

  @Action(VacationsActions.AssignUserToVacation)
  AssignUserToVacation(
    { dispatch }: StateContext<VacationsStateModel>,
    { vacationId, userId, byCity }: VacationsActions.AssignUserToVacation
  ): void {
    this._vacationsService
      .assignUserToVacation(vacationId, userId)
      .pipe(take(1))
      .subscribe({
        next: (response: VacationDTO) =>
          dispatch(new VacationsActions.AssignUserToVacationSuccess(response, byCity)),
        error: (err: HttpErrorResponse) =>
          dispatch(new VacationsActions.AssignUserToVacationError(err)),
      });
  }

  @Action(VacationsActions.AssignUserToVacationSuccess)
  AssignUserToVacationSuccess(
    { patchState, dispatch, getState }: StateContext<VacationsStateModel>,
    { vacation, byCity }: VacationsActions.AssignUserToVacationSuccess
  ): void {
    const currentCity2 = getState().currentCity2;
    const vacationSearchReq = getState().vacationSearchReq;
    byCity
      ? dispatch(
          new VacationsActions.LoadVacationsByCityList(currentCity2)
        )
      : dispatch(
          new VacationsActions.LoadVacationsByCityPeriodAdults(vacationSearchReq)
        );
  }

  @Action(VacationsActions.AssignUserToVacationError)
  AssignUserToVacationError(
    { patchState }: StateContext<VacationsStateModel>,
    { error }: VacationsActions.AssignUserToVacationError
  ): void {}

  
  @Action(VacationsActions.CreateVacationByUser)
  CreateVacationByUser(
    { dispatch }: StateContext<VacationsStateModel>,
    { vacationReq }: VacationsActions.CreateVacationByUser
  ): void {
    this._vacationsService
      .createVacationByUser(vacationReq)
      .pipe(take(1))
      .subscribe({
        next: () => dispatch(new VacationsActions.CreateVacationByUserSuccess()),
        error: (err: HttpErrorResponse) =>
          dispatch(new VacationsActions.CreateVacationByUserError(err)),
      });
  }

  @Action(VacationsActions.CreateVacationByUserSuccess)
  CreateVacationByUserSuccess({
    dispatch,
    getState,
  }: StateContext<VacationsStateModel>): void { }

  @Action(VacationsActions.CreateVacationByUserError)
  CreateVacationByUserError({
    error,
  }: VacationsActions.CreateVacationByUserError): void {}

  @Action(VacationsActions.DeleteVacationById)
  DeleteVacationById(
    { dispatch }: StateContext<VacationsStateModel>,
    { id }: VacationsActions.DeleteVacationById
  ): void {
    this._vacationsService
      .deleteVacationById(id)
      .pipe(take(1))
      .subscribe({
        next: () => dispatch(new VacationsActions.DeleteVacationByIdSuccess()),
        error: (err: HttpErrorResponse) =>
          dispatch(new VacationsActions.DeleteVacationByIdError(err)),
      });
  }

  @Action(VacationsActions.DeleteVacationByIdSuccess)
  DeleteVacationByIdSuccess({
    dispatch,
    getState,
  }: StateContext<VacationsStateModel>): void {
    const searchReq = getState().searchRequest;
    dispatch(
      new VacationsActions.LoadVacationListBySearchReq({ ...searchReq })
    );
  }

  @Action(VacationsActions.DeleteVacationByIdError)
  DeleteVacationByIdError(
    { patchState }: StateContext<VacationsStateModel>,
    { error }: VacationsActions.DeleteVacationByIdError
  ): void {}

  @Action(VacationsActions.AddVacation)
  AddVacation(
    { dispatch }: StateContext<VacationsStateModel>,
    { vacation }: VacationsActions.AddVacation
  ): void {
    this._vacationsService
      .addVacation(vacation)
      .pipe(take(1))
      .subscribe({
        next: () => dispatch(new VacationsActions.AddVacationSuccess()),
        error: (err: HttpErrorResponse) =>
          dispatch(new VacationsActions.AddVacationError(err)),
      });
  }

  @Action(VacationsActions.AddVacationSuccess)
  AddVacationSuccess({
    dispatch,
    getState,
  }: StateContext<VacationsStateModel>): void {
    const searchReq = getState().searchRequest;
    dispatch(
      new VacationsActions.LoadVacationListBySearchReq({ ...searchReq })
    );
  }

  @Action(VacationsActions.AddVacationError)
  AddVacationError({ error }: VacationsActions.AddVacationError): void {}

  @Action(VacationsActions.LoadSimpleVacationListBySearchReq)
  LoadSimpleVacationListBySearchReq(
    { dispatch, patchState }: StateContext<VacationsStateModel>,
    { searchReq }: VacationsActions.LoadSimpleVacationListBySearchReq
  ): void {
    const searchRequest = {
      ...searchReq,
    };
    patchState({ searchRequestSimpleVacation: searchRequest });
    this._resetMetadata2(patchState);

    this._simpleVacationsService
      .loadVacationsBySearchReq(searchRequest)
      .pipe(take(1))
      .subscribe({
        next: (response: SimpleVacationSearchResponse) =>
          dispatch(
            new VacationsActions.LoadSimpleVacationListBySearchReqSuccess(
              response
            )
          ),
        error: (err: HttpErrorResponse) =>
          dispatch(
            new VacationsActions.LoadSimpleVacationListBySearchReqError(err)
          ),
      });
  }

  @Action(VacationsActions.LoadSimpleVacationListBySearchReqSuccess)
  LoadSimpleVacationListBySearchReqSuccess(
    { patchState }: StateContext<VacationsStateModel>,
    { response }: VacationsActions.LoadSimpleVacationListBySearchReqSuccess
  ): void {
    const simpleVacationsList: StateMetadata<SimpleVacationDTO> = {
      items: response.results ?? [],
      total: response.results.length,
    };
    patchState({ simpleVacationsList });
  }

  @Action(VacationsActions.LoadSimpleVacationListBySearchReqError)
  LoadSimpleVacationListBySearchReqError(
    { patchState }: StateContext<VacationsStateModel>,
    { error }: VacationsActions.LoadSimpleVacationListBySearchReqError
  ): void {
    this._resetMetadata2(patchState);
  }

  @Action(VacationsActions.DeleteSimpleVacationById)
  DeleteSimpleVacationById(
    { dispatch }: StateContext<VacationsStateModel>,
    { id }: VacationsActions.DeleteSimpleVacationById
  ): void {
    this._simpleVacationsService
      .deleteVacationById(id)
      .pipe(take(1))
      .subscribe({
        next: () =>
          dispatch(new VacationsActions.DeleteSimpleVacationByIdSuccess()),
        error: (err: HttpErrorResponse) =>
          dispatch(new VacationsActions.DeleteSimpleVacationByIdError(err)),
      });
  }

  @Action(VacationsActions.DeleteSimpleVacationByIdSuccess)
  DeleteSimpleVacationByIdSuccess({
    dispatch,
    getState,
  }: StateContext<VacationsStateModel>): void {
    const searchReq = getState().searchRequestSimpleVacation;
    dispatch(
      new VacationsActions.LoadSimpleVacationListBySearchReq({ ...searchReq })
    );
  }

  @Action(VacationsActions.DeleteSimpleVacationByIdError)
  DeleteSimpleVacationByIdError(
    { patchState }: StateContext<VacationsStateModel>,
    { error }: VacationsActions.DeleteSimpleVacationByIdError
  ): void {}

  @Action(VacationsActions.AddSimpleVacation)
  AddSimpleVacation(
    { dispatch }: StateContext<VacationsStateModel>,
    { vacation }: VacationsActions.AddSimpleVacation
  ): void {
    this._simpleVacationsService
      .addVacation(vacation)
      .pipe(take(1))
      .subscribe({
        next: () => dispatch(new VacationsActions.AddSimpleVacationSuccess()),
        error: (err: HttpErrorResponse) =>
          dispatch(new VacationsActions.AddSimpleVacationError(err)),
      });
  }

  @Action(VacationsActions.AddSimpleVacationSuccess)
  AddSimpleVacationSuccess({
    dispatch,
    getState,
  }: StateContext<VacationsStateModel>): void {
    const searchReq = getState().searchRequestSimpleVacation;
    dispatch(
      new VacationsActions.LoadSimpleVacationListBySearchReq({ ...searchReq })
    );
  }

  @Action(VacationsActions.AddSimpleVacationError)
  AddSimpleVacationError({
    error,
  }: VacationsActions.AddSimpleVacationError): void {}

  @Action(VacationsActions.LoadSimpleVacationsByCityList)
  LoadSimpleVacationsByCityList(
    { dispatch }: StateContext<VacationsStateModel>,
    { cityName }: VacationsActions.LoadSimpleVacationsByCityList
  ): void {
    this._simpleVacationsService
      .getVacationsByCity(cityName)
      .pipe(take(1))
      .subscribe({
        next: (response: SimpleVacationDTO[]) =>
          dispatch(
            new VacationsActions.LoadSimpleVacationsByCityListSuccess(
              response,
              cityName
            )
          ),
        error: (err: HttpErrorResponse) =>
          dispatch(
            new VacationsActions.LoadSimpleVacationsByCityListError()
          ),
      });
  }

  @Action(VacationsActions.LoadSimpleVacationsByCityListSuccess)
  LoadSimpleVacationsByCityListSuccess(
    { patchState }: StateContext<VacationsStateModel>,
    {
      response,
      cityName,
    }: VacationsActions.LoadSimpleVacationsByCityListSuccess
  ): void {
    const simpleVacationsByCity: StateMetadata<SimpleVacationDTO> = {
      items: response ?? [],
      total: response.length,
    };
    patchState({ simpleVacationsByCity, currentCity: cityName });
  }

  @Action(VacationsActions.LoadSimpleVacationsByCityListError)
  LoadSimpleVacationsByCityListError(
    { patchState }: StateContext<VacationsStateModel>,
  ): void {
    const simpleVacationsByCity: StateMetadata<SimpleVacationDTO> = {
      items: [],
      total: 0,
    };
    patchState({ simpleVacationsByCity, currentCity: '' });
  }

  @Action(VacationsActions.LoadSimpleVacationsByCityPeriodAdults)
  LoadSimpleVacationsByCityPeriodAdults(
    { dispatch }: StateContext<VacationsStateModel>,
    {
      simpleVacationSearchReq,
    }: VacationsActions.LoadSimpleVacationsByCityPeriodAdults
  ): void {
    this._simpleVacationsService
      .getVacationsByCityPeriodAdults(simpleVacationSearchReq)
      .pipe(take(1))
      .subscribe({
        next: (response: SimpleVacationDTO[]) =>
          dispatch(
            new VacationsActions.LoadSimpleVacationsByCityPeriodAdultsSuccess(
              response,
              simpleVacationSearchReq
            )
          ),
        error: (err: HttpErrorResponse) =>
          dispatch(
            new VacationsActions.LoadSimpleVacationsByCityPeriodAdultsError()
          ),
      });
  }

  @Action(VacationsActions.LoadSimpleVacationsByCityPeriodAdultsSuccess)
  LoadSimpleVacationsByCityPeriodAdultsSuccess(
    { patchState }: StateContext<VacationsStateModel>,
    {
      response,
      simpleVacationSearchReq,
    }: VacationsActions.LoadSimpleVacationsByCityPeriodAdultsSuccess
  ): void {
    const simpleVacationsByCityPeriodAdults: StateMetadata<SimpleVacationDTO> =
      {
        items: response ?? [],
        total: response.length,
      };
    patchState({ simpleVacationsByCityPeriodAdults, simpleVacationSearchReq });
  }

  @Action(VacationsActions.LoadSimpleVacationsByCityPeriodAdultsError)
  LoadSimpleVacationsByCityPeriodAdultsError(
    { patchState }: StateContext<VacationsStateModel>,
  ): void {
    const simpleVacationsByCityPeriodAdults: StateMetadata<SimpleVacationDTO> =
      {
        items: [],
        total: 0,
      };
    patchState({ simpleVacationsByCityPeriodAdults, simpleVacationSearchReq: {} });
  }

  @Action(VacationsActions.AssignUserToSimpleVacation)
  AssignUserToSimpleVacation(
    { dispatch }: StateContext<VacationsStateModel>,
    { simpleVacationId, userId, byCity }: VacationsActions.AssignUserToSimpleVacation
  ): void {
    this._simpleVacationsService
      .assignUserToSimpleVacation(simpleVacationId, userId)
      .pipe(take(1))
      .subscribe({
        next: (response: SimpleVacationDTO) =>
          dispatch(
            new VacationsActions.AssignUserToSimpleVacationSuccess(response, byCity)
          ),
        error: (err: HttpErrorResponse) =>
          dispatch(new VacationsActions.AssignUserToSimpleVacationError(err)),
      });
  }

  @Action(VacationsActions.AssignUserToSimpleVacationSuccess)
  AssignUserToSimpleVacationSuccess(
    { patchState, dispatch, getState }: StateContext<VacationsStateModel>,
    { simpleVacation, byCity }: VacationsActions.AssignUserToSimpleVacationSuccess
  ): void {
    const currentCity = getState().currentCity;
    const simpleVacationSearchReq = getState().simpleVacationSearchReq;
    byCity
      ? dispatch(
          new VacationsActions.LoadSimpleVacationsByCityList(currentCity)
        )
      : dispatch(
          new VacationsActions.LoadSimpleVacationsByCityPeriodAdults(
            simpleVacationSearchReq
          )
        );
  }

  @Action(VacationsActions.AssignUserToSimpleVacationError)
  AssignUserToSimpleVacationError(
    { patchState }: StateContext<VacationsStateModel>,
    { error }: VacationsActions.AssignUserToSimpleVacationError
  ): void {}

  private _resetMetadata(
    patchState: (val: Partial<VacationsStateModel>) => VacationsStateModel
  ): void {
    const itemList: StateMetadata<VacationDTO> = {
      items: [],
      total: 0,
    };
    patchState({ itemList });
  }

  private _resetMetadata2(
    patchState: (val: Partial<VacationsStateModel>) => VacationsStateModel
  ): void {
    const simpleVacationsList: StateMetadata<SimpleVacationDTO> = {
      items: [],
      total: 0,
    };
    patchState({ simpleVacationsList });
  }
}
