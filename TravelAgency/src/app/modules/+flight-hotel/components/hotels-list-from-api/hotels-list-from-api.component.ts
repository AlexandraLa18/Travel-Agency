import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ConfirmationModalComponent } from 'src/app/modules/+flights/components/confirmation-modal/confirmation-modal.component';
import { HotelFacade } from 'src/app/modules/+hotels/state/hotel.facade';
import { HotelDTO } from 'src/app/shared/models/hotelDTO';

@Component({
  selector: 'app-hotels-list-from-api',
  templateUrl: './hotels-list-from-api.component.html',
  styleUrls: ['./hotels-list-from-api.component.scss'],
})
export class HotelsListFromApiComponent {
  @Input() title!: string;
  @Input() checkin!: string;
  @Input() checkout!: string;

  readonly apiHotels$ = this._hotelFacade.apiHotels$;
  readonly apiHotelsLoading$ = this._hotelFacade.apiHotelsLoading$;
  readonly apiHotelsDataNotFound$ = this._hotelFacade.apiHotelsDataNotFound$;

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
