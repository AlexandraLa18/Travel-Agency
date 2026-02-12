import { Component, OnInit } from '@angular/core';
import { VacationsFacade } from '../../state/vacations.facade';
import { VacationDTO } from 'src/app/shared/models/vacationDTO';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { toSignal } from '@angular/core/rxjs-interop';
import { ModalController } from '@ionic/angular';
import { PaginationDTO } from 'src/app/shared/models/paginationDTO';
import { SearchRequestDTO } from 'src/app/shared/models/searchRequestDTO';
import { TableFieldtDTO } from 'src/app/shared/models/tableFieldDTO';
import { HotelBookingsListComponent } from '../hotel-bookings-list/hotel-bookings-list.component';
import { FlightBookingsListComponent } from '../flight-bookings-list/flight-bookings-list.component';
import { HotelDTO } from 'src/app/shared/models/hotelDTO';
import { FlightDTO } from 'src/app/shared/models/flightDTO';
import { VacationDetailsViewComponent } from '../vacation-details-view/vacation-details-view.component';
import { Router } from '@angular/router';
import { SessionStorageService } from 'src/app/core/storage/services/session-storage.service';
import { SimpleVacationDTO } from 'src/app/shared/models/simpleVacationDTO';
import { AuthFacade } from 'src/app/modules/+auth/state/auth.facade';
import { DestinationFacade } from 'src/app/modules/+destinations/state/destinations.facade';
import { HotelFacade } from 'src/app/modules/+hotels/state/hotel.facade';
import { FlightFacade } from 'src/app/modules/+flights/state/flights.facade';

@Component({
  selector: 'app-vacations-list',
  templateUrl: './vacations-list.component.html',
  styleUrls: ['./vacations-list.component.scss'],
})
export class VacationsListComponent implements OnInit {
  readonly total$ = this._vacationsFacade.total$;
  readonly vacationsList$ = this._vacationsFacade.vacationsList$;
  readonly vacationsList = toSignal(this.vacationsList$);
  readonly destinations$ = this._destinationFacade.destinationListS$;
  readonly selectedHotelBooking$ = this._hotelFacade.selectedHotelBooking$;
  readonly selectedFlightBooking$ = this._flightFacade.selectedFlightBooking$;
  readonly hotelIsSelected$ = this._hotelFacade.hotelIsSelected$;
  readonly flightIsSelected$ = this._flightFacade.flightIsSelected$;

  //simple vacations
  readonly simpleVacationsList$ = this._vacationsFacade.simpleVacationsList$;
  readonly simpleVacationsList = toSignal(this.simpleVacationsList$);
  readonly Stotal$ = this._vacationsFacade.Stotal$;

  vacationsFormGroup!: FormGroup;
  selectedHotelBooking: HotelDTO | null = null;
  selectedFlightBooking: FlightDTO | null = null;
  public minDate: string | undefined;

  pageSize: number = 5;
  tableFields: TableFieldtDTO[] = [
    {
      columnName: 'from',
      visible: true,
      customTemplate: true,
      sortable: true,
      width: 30,
    },
    {
      columnName: 'to',
      visible: true,
      customTemplate: true,
      sortable: true,
      width: 30,
    },
    {
      columnName: 'startDate',
      visible: true,
      customTemplate: true,
      sortable: true,
      width: 50,
    },
    {
      columnName: 'endDate',
      visible: true,
      customTemplate: true,
      sortable: true,
      width: 50,
    },
    {
      columnName: 'flight',
      visible: true,
      customTemplate: true,
      sortable: true,
      width: 30,
    },
    {
      columnName: 'hotel',
      visible: true,
      customTemplate: true,
      sortable: true,
      width: 30,
    },
    {
      columnName: 'totalPrice',
      visible: true,
      customTemplate: true,
      sortable: true,
      width: 50,
    },
    {
      columnName: 'isUsed',
      visible: true,
      customTemplate: true,
      sortable: true,
      width: 50,
    },
  ];
  simpleVacationsTableFields: TableFieldtDTO[] = [
    {
      columnName: 'to',
      visible: true,
      customTemplate: true,
      sortable: true,
      width: 30,
    },
    {
      columnName: 'startDate',
      visible: true,
      customTemplate: true,
      sortable: true,
      width: 50,
    },
    {
      columnName: 'endDate',
      visible: true,
      customTemplate: true,
      sortable: true,
      width: 50,
    },
    {
      columnName: 'hotel',
      visible: true,
      customTemplate: true,
      sortable: true,
      width: 30,
    },
    {
      columnName: 'totalPrice',
      visible: true,
      customTemplate: true,
      sortable: true,
      width: 50,
    },
    {
      columnName: 'isUsed',
      visible: true,
      customTemplate: true,
      sortable: true,
      width: 50,
    },
  ];
  searchReq: SearchRequestDTO = {
    paginationDTO: {
      page: 0,
      pageSize: 5,
    },
  };
  searchReqSV: SearchRequestDTO = {
    paginationDTO: {
      page: 0,
      pageSize: 5,
    },
  };

  constructor(
    private readonly _vacationsFacade: VacationsFacade,
    private readonly _fb: FormBuilder,
    private modalController: ModalController,
    private readonly _authFacade: AuthFacade,
    private readonly _destinationFacade: DestinationFacade,
    private readonly _hotelFacade: HotelFacade,
    private readonly _flightFacade: FlightFacade
  ) {
    const today = new Date();
    this.minDate = today.toISOString().split('T')[0];
  }

  ngOnInit() {
    this._initFormGroup();
    this._vacationsFacade.loadVacationsListBySearchReq(this.searchReq);
    this._vacationsFacade.loadSimpleVacationListBySearchReq(this.searchReqSV);
    this._destinationFacade.loadDestinationList();

    this._hotelFacade.selectedHotelBooking$.subscribe(hotel => this.selectedHotelBooking = hotel);
    this._flightFacade.selectedFlightBooking$.subscribe(flight => this.selectedFlightBooking = flight);

  }

  logout() {
    this._authFacade.logout();

  }

  pageChange(paginationDTO: PaginationDTO) {
    this.searchReq.paginationDTO = paginationDTO;
    this._vacationsFacade.loadVacationsListBySearchReq(this.searchReq);
  }

  pageChange1(paginationDTO: PaginationDTO) {
    this.searchReq.paginationDTO = paginationDTO;
    this._vacationsFacade.loadSimpleVacationListBySearchReq(this.searchReqSV);
  }

  async goToDetailsView(vacation: VacationDTO) {
    const modal = await this.modalController.create({
      component: VacationDetailsViewComponent,
      cssClass: 'vacation-details-modal',
      componentProps: {
        vacation: vacation,
      },
    });
    return await modal.present();
  }

  async goToDetailsViewSV(vacation: SimpleVacationDTO) {
    const new_vacation: VacationDTO = {
      vacation_id: vacation.simpleVacation_id, 
      hotel: vacation.hotel,
      type: vacation.type,
      description: vacation.description,
      title: vacation.title,
      totalPrice: vacation.totalPrice,
      showInDashboard: vacation.showInDashboard,
      noOfPassengers: vacation.noOfPassengers,
      used: vacation.used
    }
    console.log(new_vacation)
    const modal = await this.modalController.create({
      component: VacationDetailsViewComponent,
      cssClass: 'vacation-details-modal',
      componentProps: {
        vacation: new_vacation,
      },
    });
    return await modal.present();
  }

  deleteVacation(vacation: VacationDTO, $event: MouseEvent) {
    $event.stopPropagation();
    this._vacationsFacade.deleteVacationById(vacation.vacation_id);
  }

  deleteSimpleVacation(vacation: SimpleVacationDTO, $event: MouseEvent) {
    $event.stopPropagation();
    this._vacationsFacade.deleteSimpleVacationById(vacation.simpleVacation_id);
  }

  close(modal: any) {
    modal.dismiss();
    this._reset();
  }
  
  private _reset() {
    this.vacationsFormGroup.reset({
      from: null,
      to: null,
      startDate: this.minDate,
      endDate: this.minDate,
      type: null,
      totalPrice: null,
      title: null,
      description: null,
      showInDashboard: false,
      noOfPassengers: 2
    });
    this._hotelFacade.resetHotelBookingsList();
    this._flightFacade.resetFlightBookingsList();
    this._hotelFacade.resetSelectedHotelBooking();
    this._flightFacade.resetSelectedFlightBooking();

  }

  saveVacation(modal: any) {
    if (this.selectedHotelBooking?.name) {
      if(this.selectedFlightBooking?.cabinClass) {
        let vacation: VacationDTO = {
          flight: this.selectedFlightBooking,
          hotel: this.selectedHotelBooking,
          type: this.vacationsFormGroup.controls['type'].value,
          title: this.vacationsFormGroup.controls['title'].value,
          description: this.vacationsFormGroup.controls['description'].value,
          totalPrice: null,
          showInDashboard: this.vacationsFormGroup.controls['showInDashboard'].value,
          noOfPassengers:this.vacationsFormGroup.controls['noOfPassengers'].value
        };
        this._vacationsFacade.addVacation(vacation);
      }
      else {
        let vacation: SimpleVacationDTO = {
          hotel: this.selectedHotelBooking,
          type: this.vacationsFormGroup.controls['type'].value,
          title: this.vacationsFormGroup.controls['title'].value,
          description: this.vacationsFormGroup.controls['description'].value,
          totalPrice: null,
          showInDashboard: this.vacationsFormGroup.controls['showInDashboard'].value,
          noOfPassengers:this.vacationsFormGroup.controls['noOfPassengers'].value
        };
        this._vacationsFacade.addSimpleVacation(vacation);
      }
      modal.dismiss();
      this._reset();
    } else {
      Object.keys(this.vacationsFormGroup.controls).forEach((field) => {
        const control = this.vacationsFormGroup.get(field);
        control?.markAsTouched({ onlySelf: true });
      });
    }
  }
  
  async searchHotels() {
    if (this.vacationsFormGroup.controls['to'].valid && this.vacationsFormGroup.controls['startDate'].valid
    && this.vacationsFormGroup.controls['endDate'].valid) {
      this._hotelFacade.loadHotelBookingsList(
        this.vacationsFormGroup.controls['to'].value.destination_id,
        this.vacationsFormGroup.controls['startDate'].value,
        this.vacationsFormGroup.controls['endDate'].value,
        this.vacationsFormGroup.controls['noOfPassengers'].value,
      );
      const modal = await this.modalController.create({
        component: HotelBookingsListComponent,
        id: 'hotel-bookings-list',
        componentProps: {
          title:
            this.vacationsFormGroup.controls['to'].value.city +
            ', ' +
            this.vacationsFormGroup.controls['to'].value.country,
          checkin: this.vacationsFormGroup.controls['startDate'].value,
          checkout: this.vacationsFormGroup.controls['endDate'].value,
        },
      });
      return await modal.present();
    } else {
      Object.keys(this.vacationsFormGroup.controls).forEach((field) => {
        const control = this.vacationsFormGroup.get(field);
        control?.markAsTouched({ onlySelf: true });
      });
    }
  }

  async searchFlights() {
    if (this.vacationsFormGroup.controls['from'].valid && this.vacationsFormGroup.controls['to'].valid && this.vacationsFormGroup.controls['startDate'].valid
    && this.vacationsFormGroup.controls['endDate'].valid) {
      this._flightFacade.loadFlightBookingsList(
        this.vacationsFormGroup.controls['from'].value.destination_id,
        this.vacationsFormGroup.controls['to'].value.destination_id,
        this.vacationsFormGroup.controls['startDate'].value,
        this.vacationsFormGroup.controls['endDate'].value,
        this.vacationsFormGroup.controls['noOfPassengers'].value,
      );
      const modal = await this.modalController.create({
        component: FlightBookingsListComponent,
        componentProps: {
          title:
            this.vacationsFormGroup.controls['from'].value.city +
            '   -   ' +
            this.vacationsFormGroup.controls['to'].value.city,
          checkin: this.vacationsFormGroup.controls['startDate'].value,
          checkout: this.vacationsFormGroup.controls['endDate'].value,
        },
      });
      return await modal.present();
    } else {
      Object.keys(this.vacationsFormGroup.controls).forEach((field) => {
        const control = this.vacationsFormGroup.get(field);
        control?.markAsTouched({ onlySelf: true });
      });
    }  }

  toggleFilter() {}

  private _initFormGroup() {
    this.vacationsFormGroup = this._fb.group({
      from: [null, Validators.required],
      to: [null, Validators.required],
      startDate: [this.minDate, Validators.required],
      endDate: [this.minDate, Validators.required],
      type: [null, Validators.required],
      totalPrice: [null],
      description: [null],
      showInDashboard: [false],
      noOfPassengers: [2, Validators.required],
      title: [null, Validators.required]
    });
  }

  updateCheckin() {
    const checkinValue = this.vacationsFormGroup.controls['startDate'].value;
    this.vacationsFormGroup.controls['startDate'].setValue(checkinValue);
  }

  updateCheckout() {
    const checkoutValue = this.vacationsFormGroup.controls['endDate'].value;
    this.vacationsFormGroup.controls['endDate'].setValue(checkoutValue);
  }
}
