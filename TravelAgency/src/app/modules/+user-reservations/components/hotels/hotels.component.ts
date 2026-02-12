import { Component, OnInit } from '@angular/core';
import { ReservationsFacade } from '../../state/user-reservations.facade';
import { HotelDTO } from 'src/app/shared/models/hotelDTO';
import { ConfirmationModalComponent } from 'src/app/modules/+flights/components/confirmation-modal/confirmation-modal.component';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-hotels',
  templateUrl: './hotels.component.html',
  styleUrls: ['./hotels.component.scss'],
})
export class HotelsComponent {
  readonly hotels$ = this._reservationsFacade.hotels$;

  constructor(
    private modalController: ModalController,
    private readonly _reservationsFacade: ReservationsFacade,
    private readonly _router: Router
  ) {}
  
  async dismiss() {
    await this.modalController.dismiss();
  }

  handleCancelHotel(hotel: HotelDTO) {
    this._reservationsFacade.cancelHotels(hotel.id);
  }

  async openConfirmationModal(hotel: HotelDTO){
    const modal = await this.modalController.create({
      component: ConfirmationModalComponent,
      cssClass: 'confirmation-modal',
      componentProps: { content: 'Are you sure you would like to cancel this hotel booking?' }
    });

    await modal.present();

    const { data } = await modal.onWillDismiss();
    if (data && data.confirm) {
      this.handleCancelHotel(hotel);
    }
  }
}