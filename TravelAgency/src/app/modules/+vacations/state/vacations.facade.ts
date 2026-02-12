import { VacationDTO } from 'src/app/shared/models/vacationDTO';
import { VacationsState } from './vacations.state';
import { VacationsActions } from './vacations.actions';
import { Injectable } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable, from } from 'rxjs';
import { SearchRequestDTO } from 'src/app/shared/models/searchRequestDTO';
import { SimpleVacationDTO } from 'src/app/shared/models/simpleVacationDTO';
import { SimpleVacationSearchReq } from 'src/app/shared/models/simpleVacationSearchReq';
import { SimpleVacationRequest } from 'src/app/shared/models/simpleVacationRequest';
import { VacationRequest } from 'src/app/shared/models/vacationRequest';

@Injectable({
  providedIn: 'root',
})
export class VacationsFacade {
  @Select(VacationsState.items) readonly vacationsList$!: Observable<VacationDTO[]>;
  @Select(VacationsState.simpleVacationsItems) readonly simpleVacationsList$!: Observable<SimpleVacationDTO[]>;
  @Select(VacationsState.total) readonly total$!: Observable<number>;
  @Select(VacationsState.Stotal) readonly Stotal$!: Observable<number>;
  @Select(VacationsState.vacationsByCity) readonly vacationsByCity$!: Observable<VacationDTO[]>;
  @Select(VacationsState.vacationsByCityPeriodAdults) readonly vacationsByCityPeriodAdults$!: Observable<VacationDTO[]>;
  @Select(VacationsState.simpleVacationsByCity) readonly simpleVacationsByCity$!: Observable<SimpleVacationDTO[]>;
  @Select(VacationsState.simpleVacationsByCityPeriodAdults) readonly simpleVacationsByCityPeriodAdults$!: Observable<SimpleVacationDTO[]>;
  
  constructor(private readonly _store: Store) {}

  loadVacationsListBySearchReq(searchReq: SearchRequestDTO): void {
    this._store.dispatch(new VacationsActions.LoadVacationListBySearchReq(searchReq));
  }
    
  loadVacationsByCityList(cityName: string): void {
    this._store.dispatch(new VacationsActions.LoadVacationsByCityList(cityName));
  }

  resetVacationsByCityList(): void {
    this._store.dispatch(new VacationsActions.LoadVacationsByCityListError());
  }

  loadVacationsByCityPeriodAdults(simpleVacationSearchReq: SimpleVacationSearchReq): void {
    this._store.dispatch(new VacationsActions.LoadVacationsByCityPeriodAdults(simpleVacationSearchReq));
  }

  resetVacationsByCityPeriodAdults(): void {
    this._store.dispatch(new VacationsActions.LoadVacationsByCityPeriodAdultsError());
  }

  deleteVacationById(id: number | undefined | null): void {
    this._store.dispatch(new VacationsActions.DeleteVacationById(id));
  }

  addVacation(vacation: VacationDTO): void {
    this._store.dispatch(new VacationsActions.AddVacation(vacation));
  }

  assignUserToVacation(vacation_id: number | null | undefined, user_id: number | null | undefined, byCity: boolean): void {
    this._store.dispatch(new VacationsActions.AssignUserToVacation(vacation_id, user_id, byCity));
  }

  createVacationByUser(vacationReq: VacationRequest): void {
    this._store.dispatch(new VacationsActions.CreateVacationByUser(vacationReq));
  }

  //simple vacations
  loadSimpleVacationListBySearchReq(searchReq: SearchRequestDTO): void {
    this._store.dispatch(
      new VacationsActions.LoadSimpleVacationListBySearchReq(searchReq)
    );
  }

  loadSimpleVacationsByCityList(cityName: string): void {
    this._store.dispatch(new VacationsActions.LoadSimpleVacationsByCityList(cityName));
  }

  resetSimpleVacationsByCityList(): void {
    this._store.dispatch(new VacationsActions.LoadSimpleVacationsByCityListError());
  }

  loadSimpleVacationsByCityPeriodAdults(simpleVacationSearchReq: SimpleVacationSearchReq): void {
    this._store.dispatch(new VacationsActions.LoadSimpleVacationsByCityPeriodAdults(simpleVacationSearchReq));
  }

  resetSimpleVacationsByCityPeriodAdults(): void {
    this._store.dispatch(new VacationsActions.LoadSimpleVacationsByCityPeriodAdultsError());
  }

  deleteSimpleVacationById(id: number | undefined | null): void {
    this._store.dispatch(new VacationsActions.DeleteSimpleVacationById(id));
  }

  addSimpleVacation(vacation: VacationDTO): void {
    this._store.dispatch(new VacationsActions.AddSimpleVacation(vacation));
  }

  assignUserToSimpleVacation(simpleVacation_id: number | null | undefined, user_id: number | null | undefined, byCity: boolean): void {
    this._store.dispatch(new VacationsActions.AssignUserToSimpleVacation(simpleVacation_id, user_id, byCity));
  }
}
