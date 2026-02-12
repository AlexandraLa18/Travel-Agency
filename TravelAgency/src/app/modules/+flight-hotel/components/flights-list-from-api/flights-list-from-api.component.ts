import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { ConfirmationModalComponent } from 'src/app/modules/+flights/components/confirmation-modal/confirmation-modal.component';
import { FlightFacade } from 'src/app/modules/+flights/state/flights.facade';
import { FlightDTO } from 'src/app/shared/models/flightDTO';

@Component({
  selector: 'app-flights-list-from-api',
  templateUrl: './flights-list-from-api.component.html',
  styleUrls: ['./flights-list-from-api.component.scss'],
})
export class FlightsListFromApiComponent  {
  @Input() title!: string;
  @Input() checkin!: string;
  @Input() checkout!: string;

  readonly apiFlights$ = this._flightFacade.apiFlights$;
  readonly apiFlightsLoading$ = this._flightFacade.apiFlightsLoading$;
  readonly apiFlightsDataNotFound$ = this._flightFacade.apiFlightsDataNotFound$;

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
