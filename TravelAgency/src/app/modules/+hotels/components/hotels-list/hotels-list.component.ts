import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { HotelDTO } from 'src/app/shared/models/hotelDTO';
import { HotelFacade } from '../../state/hotel.facade';
import { UntilDestroy } from '@ngneat/until-destroy';
import { toSignal } from '@angular/core/rxjs-interop';
import { PaginationDTO } from 'src/app/shared/models/paginationDTO';
import { TableFieldtDTO } from 'src/app/shared/models/tableFieldDTO';
import { SearchRequestDTO } from 'src/app/shared/models/searchRequestDTO';
import { ModalController } from '@ionic/angular';
import {
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { HotelDetailsViewComponent } from '../hotel-details-view/hotel-details-view.component';
import { ApiHotelBookingsListComponent } from '../api-hotel-bookings-list/api-hotel-bookings-list.component';
import { HotelFilterComponent } from '../hotel-filter/hotel-filter.component';
import { SessionStorageService } from 'src/app/core/storage/services/session-storage.service';
import { Router } from '@angular/router';
import { DestinationFacade } from 'src/app/modules/+destinations/state/destinations.facade';
import { AuthFacade } from 'src/app/modules/+auth/state/auth.facade';

@UntilDestroy()
@Component({
  selector: 'app-hotels-list',
  templateUrl: './hotels-list.component.html',
  styleUrls: ['./hotels-list.component.scss'],
})
export class HotelsListComponent implements OnInit {
  readonly total$ = this._hotelsFacade.total$;
  readonly hotelsList$ = this._hotelsFacade.hotelList$;
  readonly hotelsList = toSignal(this.hotelsList$);
  readonly destinations$ = this._destinationFacade.destinationListS$;

  hotelBookingFormGroup!: FormGroup;
  public minDate: string | undefined;

  pageSize: number = 10;
  tableFields: TableFieldtDTO[] = [
    {
      columnName: 'name',
      visible: true,
      customTemplate: false,
      sortable: true,
      width: 100,
    },
    {
      columnName: 'address',
      visible: false,
      customTemplate: false,
      sortable: true,
      width: 10,
    },
    {
      columnName: 'destination',
      visible: true,
      customTemplate: true,
      sortable: true,
      width: 10,
    },
    {
      columnName: 'checkin',
      visible: true,
      customTemplate: false,
      sortable: true,
      width: 100,
    },
    {
      columnName: 'checkout',
      visible: true,
      customTemplate: false,
      sortable: true,
      width: 100,
    },
    {
      columnName: 'stars',
      visible: true,
      customTemplate: false,
      sortable: true,
      width: 30,
    },
    {
      columnName: 'distance',
      visible: true,
      customTemplate: false,
      sortable: true,
      width: 100,
    },
    {
      columnName: 'relevantPoiDistance',
      visible: true,
      customTemplate: true,
      sortable: true,
      width: 100,
    },
    {
      columnName: 'price',
      visible: true,
      customTemplate: true,
      sortable: true,
      width: 100,
    },
    {
      columnName: 'description',
      visible: false,
      customTemplate: false,
      sortable: true,
      width: 1,
    },
    {
      columnName: 'entityId',
      visible: false,
      customTemplate: false,
      sortable: true,
      width: 1,
    },
    {
      columnName: 'image1',
      visible: false,
      customTemplate: false,
      sortable: true,
      width: 1,
    },
    {
      columnName: 'image2',
      visible: false,
      customTemplate: false,
      sortable: true,
      width: 1,
    },
    {
      columnName: 'image3',
      visible: false,
      customTemplate: false,
      sortable: true,
      width: 1,
    },
    {
      columnName: 'amenitiesDescription',
      visible: false,
      customTemplate: false,
      sortable: true,
      width: 1,
    },
    {
      columnName: 'noticeFromTheHotel',
      visible: false,
      customTemplate: false,
      sortable: true,
      width: 1,
    },
    {
      columnName: 'used',
      visible: false,
      customTemplate: false,
      sortable: true,
      width: 1,
    },
  ];
  searchReq: SearchRequestDTO = {
    paginationDTO: {
      page: 0,
      pageSize: 10,
    },
    sortField: 'name',
    sortOrder: 'asc',
  };

  constructor(
    private readonly _destinationFacade: DestinationFacade,
    private readonly _hotelsFacade: HotelFacade,
    private readonly _fb: FormBuilder,
    private modalController: ModalController,
    private readonly _authFacade: AuthFacade
  ) {
    const today = new Date();
    this.minDate = today.toISOString().split('T')[0];
  }

  ngOnInit() {
    this._initFormGroup();
    this._hotelsFacade.loadHotelListBySearchReq(this.searchReq);
    this._destinationFacade.loadDestinationList();
  }

  logout() {
    this._authFacade.logout();
  }

  pageChange(paginationDTO: PaginationDTO) {
    this.searchReq.paginationDTO = paginationDTO;
    this._hotelsFacade.loadHotelListBySearchReq(this.searchReq);
  }

  async goToDetailsView(hotel: HotelDTO) {
    const modal = await this.modalController.create({
      component: HotelDetailsViewComponent,
      cssClass: 'hotel-details-modal',
      componentProps: {
        hotel: hotel,
      },
    });
    return await modal.present();
  }

  deleteHotel(hotel: HotelDTO, $event: MouseEvent) {
    $event.stopPropagation();
    this._hotelsFacade.deleteHotelById(hotel.id);
  }

  close(modal: any) {
    modal.dismiss();
    this.hotelBookingFormGroup.reset({
      destination: null,
      checkin: this.minDate,
      checkout: this.minDate,
      rooms: 1,
      adults: 2,
      resultsPerPage: 15,
      page: 1,
    });
  }

  async searchHotels() {
    if (this.hotelBookingFormGroup.valid) {
      this._hotelsFacade.loadApiHotelsList(
        this.hotelBookingFormGroup.controls['destination'].value.entityId,
        this.hotelBookingFormGroup.controls['checkin'].value,
        this.hotelBookingFormGroup.controls['checkout'].value,
        this.hotelBookingFormGroup.controls['rooms'].value,
        this.hotelBookingFormGroup.controls['adults'].value,
        this.hotelBookingFormGroup.controls['resultsPerPage'].value,
        this.hotelBookingFormGroup.controls['page'].value
      );
      const modal = await this.modalController.create({
        component: ApiHotelBookingsListComponent,
        componentProps: {
          title:
            this.hotelBookingFormGroup.controls['destination'].value.city +
            ', ' +
            this.hotelBookingFormGroup.controls['destination'].value.country,
          checkin: this.hotelBookingFormGroup.controls['checkin'].value,
          checkout: this.hotelBookingFormGroup.controls['checkout'].value,
          rooms: this.hotelBookingFormGroup.controls['rooms'].value,
          adults: this.hotelBookingFormGroup.controls['adults'].value,
          destinationEntityId: this.hotelBookingFormGroup.controls['destination'].value.entityId
        },
      });
      this.hotelBookingFormGroup.reset({
        destination: null,
        checkin: this.minDate,
        checkout: this.minDate,
        rooms: 1,
        adults: 2,
        resultsPerPage: 15,
        page: 1,
      });
      return await modal.present();
    } else {
      Object.keys(this.hotelBookingFormGroup.controls).forEach((field) => {
        const control = this.hotelBookingFormGroup.get(field);
        control?.markAsTouched({ onlySelf: true });
      });
    }
  }

  async toggleFilter() {
    const modal = await this.modalController.create({
      component: HotelFilterComponent,
      cssClass: 'hotel-filter-modal',
      componentProps: { },
    });
    return await modal.present();
  }

  private _initFormGroup() {
    this.hotelBookingFormGroup = this._fb.group({
      destination: [null, Validators.required],
      checkin: [this.minDate, Validators.required],
      checkout: [this.minDate, Validators.required],
      rooms: [1, Validators.required],
      adults: [2, Validators.required],
      resultsPerPage: [15, Validators.required],
      page: [1, Validators.required],
    });
  }

  updateCheckin() {
    const checkinValue = this.hotelBookingFormGroup.controls['checkin'].value;
    this.hotelBookingFormGroup.controls['checkin'].setValue(checkinValue);
  }

  updateCheckout() {
    const checkoutValue = this.hotelBookingFormGroup.controls['checkout'].value;
    this.hotelBookingFormGroup.controls['checkout'].setValue(checkoutValue);
  }
}
