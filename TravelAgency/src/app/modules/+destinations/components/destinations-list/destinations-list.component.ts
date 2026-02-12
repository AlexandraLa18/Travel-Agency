import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { UntilDestroy } from '@ngneat/until-destroy';
import { DestinationFacade } from '../../state/destinations.facade';
import { toSignal } from '@angular/core/rxjs-interop';
import { DestinationDTO } from 'src/app/shared/models/destinationDTO';
import { TableFieldtDTO } from 'src/app/shared/models/tableFieldDTO';
import { SearchRequestDTO } from 'src/app/shared/models/searchRequestDTO';
import { PaginationDTO } from 'src/app/shared/models/paginationDTO';
import { FormControl } from '@angular/forms';
import {
  Observable,
  catchError,
  debounceTime,
  distinctUntilChanged,
  filter,
  finalize,
  of,
  switchMap,
  tap,
} from 'rxjs';
import { DestinationsService } from '../../services/destinations.service';
import { SessionStorageService } from 'src/app/core/storage/services/session-storage.service';
import { Router } from '@angular/router';
import { AuthFacade } from 'src/app/modules/+auth/state/auth.facade';

@UntilDestroy()
@Component({
  selector: 'app-destinations-list',
  templateUrl: './destinations-list.component.html',
  styleUrls: ['./destinations-list.component.scss'],
})
export class DestinationsListComponent implements OnInit {
  readonly total$ = this._destinationFacade.total$;
  readonly destinationsList$ = this._destinationFacade.destinationListBySearchReq$;
  readonly destinationsList = toSignal(this.destinationsList$);

  readonly filteredOptions$ = this._destinationFacade.apiDestinationList$;
  readonly apiLoading$ = this._destinationFacade.apiLoading$;
  readonly apiDataNotFound$ = this._destinationFacade.apiDataNotFound$;

  searchControl = new FormControl();
  imageURL = new FormControl(null);
  showInDashboard= new FormControl(false);
  selectedDestination: any;
  searchMade = false;
  isInputFocused: boolean = false;

  pageSize: number = 10;
  tableFields: TableFieldtDTO[] = [
    {
      columnName: 'city',
      visible: true,
      customTemplate: false,
      sortable: true,
      width: 10,
    },
    {
      columnName: 'country',
      visible: true,
      customTemplate: false,
      sortable: true,
      width: 10,
    },
  ];
  searchReq: SearchRequestDTO = {
    paginationDTO: {
      page: 0,
      pageSize: 10,
    },
    sortField: 'city',
    sortOrder: 'asc',
  };

  constructor(
    private readonly _destinationFacade: DestinationFacade,
    private readonly _authFacade: AuthFacade
    ) {}

  ngOnInit() {
    this._destinationFacade.loadDestinationListBySearchReq(this.searchReq);

    this.searchControl.valueChanges
      .pipe(
        filter(
          (value) => typeof value === 'string' && !this.selectedDestination
        ),
        distinctUntilChanged(),
        debounceTime(500)
      )
      .subscribe((value) => {
        this._destinationFacade.loadApiDestinationList(value);
        this.searchMade = true;
      });
  }

  logout() {
    this._authFacade.logout();
  }

  handleBlur() {
    setTimeout(() => {
      this.isInputFocused = false;
    }, 150)
  }

  pageChange(paginationDTO: PaginationDTO) {
    this.searchReq.paginationDTO = paginationDTO;
    this._destinationFacade.loadDestinationListBySearchReq(this.searchReq);
  }

  deleteDestination(destination: DestinationDTO, $event: MouseEvent) {
    $event.stopPropagation();
    this._destinationFacade.deleteDestinationById(destination.destination_id);
  }

  selectOption(option: DestinationDTO) {
    this.selectedDestination = option;
    this.isInputFocused = false;
    this.searchControl.setValue(this.selectedDestination.city);
  }

  saveDestination(modal: any) {
    if (this.selectedDestination){
      const newDestination: DestinationDTO = {...this.selectedDestination, imageUrl: this.imageURL.value, showInDashboard: this.showInDashboard.value };
      this._destinationFacade.addDestination(newDestination);
    }
    modal.dismiss();
    this.selectedDestination = null;
    this.searchControl.setValue(null);
    this.imageURL.setValue(null);
    this.showInDashboard.setValue(false);
    this.searchMade = false;
    this._destinationFacade.resetApiDestinationList();
  }

  close(modal: any) {
    modal.dismiss();
    this.selectedDestination = null;
    this.searchControl.setValue(null);
    this.searchMade = false;
    this._destinationFacade.resetApiDestinationList();
  }

  toggleFilter() {}
}
