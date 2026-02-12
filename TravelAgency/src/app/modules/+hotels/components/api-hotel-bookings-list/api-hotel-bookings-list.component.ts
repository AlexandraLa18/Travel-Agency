import { Component, Input, OnInit } from '@angular/core';
import { HotelFacade } from '../../state/hotel.facade';
import { ModalController } from '@ionic/angular';
import { HotelDTO } from 'src/app/shared/models/hotelDTO';
import { ConfirmationModalComponent } from 'src/app/modules/+flights/components/confirmation-modal/confirmation-modal.component';

@Component({
  selector: 'app-api-hotel-bookings-list',
  templateUrl: './api-hotel-bookings-list.component.html',
  styleUrls: ['./api-hotel-bookings-list.component.scss'],
})
export class ApiHotelBookingsListComponent {
  @Input() title!: string;
  @Input() checkin!: string;
  @Input() checkout!: string;
  @Input() rooms!: number;
  @Input() adults!: number;
  @Input() destinationEntityId!: string;
  
  readonly total$ = this._hotelFacade.apiHotelsTotal$;
  readonly apiHotels$ = this._hotelFacade.apiHotels$;
  readonly apiHotelsLoading$ = this._hotelFacade.apiHotelsLoading$;
  readonly apiHotelsDataNotFound$ = this._hotelFacade.apiHotelsDataNotFound$;

  constructor(
    private modalController: ModalController,
    private readonly _hotelFacade: HotelFacade
  ) {}

  async dismiss() {
    this.modalController.dismiss(undefined, undefined, 'hotel-bookings');
    await this.modalController.dismiss();
    this._hotelFacade.resetApiHotelBookingsList();
  }

  handleSaveHotel(hotel: HotelDTO) {
    this._hotelFacade.addApiHotel(hotel, this.destinationEntityId);
  }

  async openConfirmationModal(hotel: HotelDTO){
    const modal = await this.modalController.create({
      component: ConfirmationModalComponent,
      cssClass: 'confirmation-modal',
      componentProps: { content: 'Are you sure you would like to save this hotel booking?' }
    });

    await modal.present();

    const { data } = await modal.onWillDismiss();
    if (data && data.confirm) {
      this.handleSaveHotel(hotel);
    }
  }
}
