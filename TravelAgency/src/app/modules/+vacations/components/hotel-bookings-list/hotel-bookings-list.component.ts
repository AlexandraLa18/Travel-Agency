import { Component, Input, OnInit } from '@angular/core';
import { VacationsFacade } from '../../state/vacations.facade';
import { ModalController } from '@ionic/angular';
import { ConfirmationModalComponent } from 'src/app/modules/+flights/components/confirmation-modal/confirmation-modal.component';
import { HotelDTO } from 'src/app/shared/models/hotelDTO';
import { HotelFacade } from 'src/app/modules/+hotels/state/hotel.facade';

@Component({
  selector: 'app-hotel-bookings-list',
  templateUrl: './hotel-bookings-list.component.html',
  styleUrls: ['./hotel-bookings-list.component.scss'],
})
export class HotelBookingsListComponent {
  @Input() title!: string;
  @Input() checkin!: string;
  @Input() checkout!: string;

  readonly hotelBookings$ = this._hotelFacade.hotelBookings$;
  // readonly apiFlightsDataNotFound$ = this._vacationsFacade.apiHotelsDataNotFound$;

  constructor(
    private modalController: ModalController,
    private readonly _hotelFacade: HotelFacade
  ) {}
  
  async dismiss() {
    await this.modalController.dismiss();
  }

  handleSaveHotel(hotel: HotelDTO) {
    this._hotelFacade.setSelectedHotelBooking(hotel);
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
