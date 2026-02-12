import { Component, Input, OnInit } from '@angular/core';
import { VacationsFacade } from '../../state/vacations.facade';
import { ModalController } from '@ionic/angular';
import { ConfirmationModalComponent } from 'src/app/modules/+flights/components/confirmation-modal/confirmation-modal.component';
import { FlightDTO } from 'src/app/shared/models/flightDTO';
import { Router } from '@angular/router';
import { FlightFacade } from 'src/app/modules/+flights/state/flights.facade';

@Component({
  selector: 'app-flight-bookings-list',
  templateUrl: './flight-bookings-list.component.html',
  styleUrls: ['./flight-bookings-list.component.scss'],
})
export class FlightBookingsListComponent {
  @Input() title!: string;
  @Input() checkin!: string;
  @Input() checkout!: string;

  readonly flightBookings$ = this._flightFacade.flightBookings$;

  constructor(
    private modalController: ModalController,
    private readonly _flightFacade: FlightFacade,
    private readonly _router: Router
  ) {}
  
  async dismiss() {
    await this.modalController.dismiss();
  }


  handleSaveFlight(flight: FlightDTO) {
    this._flightFacade.setSelectedFlightBooking(flight);
  }

  async openConfirmationModal(flight: FlightDTO){
    const modal = await this.modalController.create({
      component: ConfirmationModalComponent,
      cssClass: 'confirmation-modal',
      componentProps: { content: 'Are you sure you would like to save this flight booking?' }
    });

    await modal.present();

    const { data } = await modal.onWillDismiss();
    if (data && data.confirm) {
      this.handleSaveFlight(flight);
    }
  }
}
