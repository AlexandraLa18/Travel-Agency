import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { ConfirmationModalComponent } from 'src/app/modules/+flights/components/confirmation-modal/confirmation-modal.component';
import { FlightDTO } from 'src/app/shared/models/flightDTO';
import { ReservationsFacade } from '../../state/user-reservations.facade';

@Component({
  selector: 'app-flights',
  templateUrl: './flights.component.html',
  styleUrls: ['./flights.component.scss'],
})
export class FlightsComponent {
  readonly flights$ = this._reservationsFacade.flights$;

  constructor(
    private modalController: ModalController,
    private readonly _reservationsFacade: ReservationsFacade,
    private readonly _router: Router
  ) {}
  
  async dismiss() {
    await this.modalController.dismiss();
  }


  handleCancelFlight(flight: FlightDTO) {
    this._reservationsFacade.cancelFlights(flight.flight_id);
  }

  async openConfirmationModal(flight: FlightDTO){
    const modal = await this.modalController.create({
      component: ConfirmationModalComponent,
      cssClass: 'confirmation-modal',
      componentProps: { content: 'Are you sure you would like to cancel this flight booking?' }
    });

    await modal.present();

    const { data } = await modal.onWillDismiss();
    if (data && data.confirm) {
      this.handleCancelFlight(flight);
    }
  }
}
