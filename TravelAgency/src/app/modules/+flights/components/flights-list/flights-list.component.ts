import { Component, OnInit } from '@angular/core';
import { FlightFacade } from '../../state/flights.facade';
import { FlightDTO } from 'src/app/shared/models/flightDTO';
import { toSignal } from '@angular/core/rxjs-interop';
import { PaginationDTO } from 'src/app/shared/models/paginationDTO';
import { SearchRequestDTO } from 'src/app/shared/models/searchRequestDTO';
import { TableFieldtDTO } from 'src/app/shared/models/tableFieldDTO';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiFlightBookingsListComponent } from '../api-flight-bookings-list/api-flight-bookings-list.component';
import { ModalController } from '@ionic/angular';
import { FlightDetailsViewComponent } from '../flight-details-view/flight-details-view.component';
import { Router } from '@angular/router';
import { SessionStorageService } from 'src/app/core/storage/services/session-storage.service';
import { DestinationFacade } from 'src/app/modules/+destinations/state/destinations.facade';
import { AuthFacade } from 'src/app/modules/+auth/state/auth.facade';

@Component({
  selector: 'app-flights-list',
  templateUrl: './flights-list.component.html',
  styleUrls: ['./flights-list.component.scss'],
})
export class FlightsListComponent implements OnInit {
  readonly total$ = this._flightFacade.total$;
  readonly flightsList$ = this._flightFacade.flightList$;
  readonly flightsList = toSignal(this.flightsList$);
  readonly destinations$ = this._destinationFacade.destinationListS$;


  flightBookingFormGroup!: FormGroup;
  public minDate: string | undefined;

  pageSize: number = 10;
  tableFields: TableFieldtDTO[] = [
    {
      columnName: 'fromDestination',
      visible: true,
      customTemplate: true,
      sortable: true,
      width: 10,
    },
    {
      columnName: 'toDestination',
      visible: true,
      customTemplate: true,
      sortable: true,
      width: 10,
    },
    {
      columnName: 'departureOrigin',
      visible: true,
      customTemplate: true,
      sortable: true,
      width: 10,
    },
    {
      columnName: 'arrivalOrigin',
      visible: false,
      customTemplate: false,
      sortable: true,
      width: 10,
    },
    {
      columnName: 'departureDestination',
      visible: true,
      customTemplate: true,
      sortable: true,
      width: 10,
    },
    {
      columnName: 'arrivalDestination',
      visible: false,
      customTemplate: false,
      sortable: true,
      width: 10,
    },
    {
      columnName: 'price',
      visible: true,
      customTemplate: false,
      sortable: true,
      width: 10,
    },
    {
      columnName: 'durationInMinutesDepart',
      visible: false,
      customTemplate: false,
      sortable: true,
      width: 10,
    },
    {
      columnName: 'durationInMinutesReturn',
      visible: false,
      customTemplate: false,
      sortable: true,
      width: 10,
    },
    {
      columnName: 'companyNameDepart',
      visible: false,
      customTemplate: false,
      sortable: true,
      width: 10,
    },
    {
      columnName: 'companyNameReturn',
      visible: false,
      customTemplate: false,
      sortable: true,
      width: 10,
    },
    {
      columnName: 'flightPlaceDepart',
      visible: true,
      customTemplate: true,
      sortable: true,
      width: 10,
    },
    {
      columnName: 'flightPlaceReturn',
      visible: true,
      customTemplate: true,
      sortable: true,
      width: 10,
    },
    {
      columnName: 'flightNumberDepart',
      visible: false,
      customTemplate: false,
      sortable: true,
      width: 10,
    },
    {
      columnName: 'flightNumberReturn',
      visible: false,
      customTemplate: false,
      sortable: true,
      width: 10,
    },
    {
      columnName: 'cabinClass',
      visible: true,
      customTemplate: true,
      sortable: true,
      width: 10,
    },
    {
      columnName: 'noPassengers',
      visible: true,
      customTemplate: true,
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
    private readonly _flightFacade: FlightFacade,
    private readonly _fb: FormBuilder,
    private modalController: ModalController,
    private readonly _authFacade: AuthFacade
  ) {
    const today = new Date();
    this.minDate = today.toISOString().split('T')[0];
  }

  ngOnInit() {
    this._initFormGroup();
    this._flightFacade.loadFlightListBySearchReq(this.searchReq);
    this._destinationFacade.loadDestinationList();
  }

  logout() {
    this._authFacade.logout();
  }

  pageChange(paginationDTO: PaginationDTO) {
    this.searchReq.paginationDTO = paginationDTO;
    this._flightFacade.loadFlightListBySearchReq(this.searchReq);
  }

  async goToDetailsView(flight: FlightDTO) {
    const modal = await this.modalController.create({
      component: FlightDetailsViewComponent,
      cssClass: 'my-custom-modal',
      componentProps: {
        flight: flight,
      },
    });
    return await modal.present();
  }

  deleteFlight(flight: FlightDTO, $event: MouseEvent) {
    $event.stopPropagation();
    this._flightFacade.deleteFlightById(flight.flight_id);
  }

  close(modal: any) {
    modal.dismiss();
    this.flightBookingFormGroup.reset({
      fromDestination: null,
      toDestination: null,
      numberOfPassengers: 2,
      departDate: this.minDate,
      endDate: this.minDate,
      cabinClass: 'economy'
  });
  }

  async searchFlights() {
    if (this.flightBookingFormGroup.valid) {
      this._flightFacade.loadApiFlightsList(
        this.flightBookingFormGroup.controls['fromDestination'].value.city,
        this.flightBookingFormGroup.controls['toDestination'].value.city,
        this.flightBookingFormGroup.controls['departDate'].value,
        this.flightBookingFormGroup.controls['endDate'].value,
        this.flightBookingFormGroup.controls['numberOfPassengers'].value,
        this.flightBookingFormGroup.controls['cabinClass'].value
      );
      const modal = await this.modalController.create({
        component: ApiFlightBookingsListComponent,
        componentProps: {
          title:
            this.flightBookingFormGroup.controls['fromDestination'].value.city +
            '    -    ' +
            this.flightBookingFormGroup.controls['toDestination'].value.city,
            checkin : this.flightBookingFormGroup.controls['departDate'].value,
            checkout: this.flightBookingFormGroup.controls['endDate'].value,
            cabinClass: this.flightBookingFormGroup.controls['cabinClass'].value,
            adults:  this.flightBookingFormGroup.controls['numberOfPassengers'].value,
        },
      });
      this.flightBookingFormGroup.reset({
        fromDestination: null,
        toDestination: null,
        numberOfPassengers: 2,
        departDate: this.minDate,
        endDate: this.minDate,
        cabinClass: 'economy'
    });
      return await modal.present();
    } else {
      Object.keys(this.flightBookingFormGroup.controls).forEach((field) => {
        const control = this.flightBookingFormGroup.get(field);
        control?.markAsTouched({ onlySelf: true });
      });
    }
  }

  toggleFilter() {}

  private _initFormGroup() {
    this.flightBookingFormGroup = this._fb.group({
      fromDestination: [null, Validators.required],
      toDestination: [null, Validators.required],
      numberOfPassengers: [2, Validators.required],
      departDate: [this.minDate, Validators.required],
      endDate: [this.minDate, Validators.required],
      cabinClass: ['economy', Validators.required],
    });
  }

  updateDepartDate() {
    const checkinValue = this.flightBookingFormGroup.controls['departDate'].value;
    this.flightBookingFormGroup.controls['departDate'].setValue(checkinValue);
  }

  updateReturnDate() {
    const checkoutValue = this.flightBookingFormGroup.controls['endDate'].value;
    this.flightBookingFormGroup.controls['endDate'].setValue(checkoutValue);
  }

}
