import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FlightFacade } from '../../state/flights.facade';
import { FlightDTO } from 'src/app/shared/models/flightDTO';
import { ConfirmationModalComponent } from '../confirmation-modal/confirmation-modal.component';
import { CurrentUserFacade } from 'src/app/shared/state/current-user/current-user.facade';
import { UserDTO } from 'src/app/shared/models/userDTO.model';

@Component({
  selector: 'app-api-flight-bookings-list',
  templateUrl: './api-flight-bookings-list.component.html',
  styleUrls: ['./api-flight-bookings-list.component.scss'],
})
export class ApiFlightBookingsListComponent implements OnInit {
  @Input() title!: string;
  @Input() checkin!: string;
  @Input() checkout!: string;
  @Input() cabinClass!: number;
  @Input() adults!: number;
  @Input() byAdmin: boolean = true;

  readonly total$ = this._flightFacade.apiFlightsTotal$;
  readonly apiFlights$ = this._flightFacade.apiFlights$;
  readonly apiFlightsLoading$ = this._flightFacade.apiFlightsLoading$;
  readonly apiFlightsDataNotFound$ = this._flightFacade.apiFlightsDataNotFound$;

  currentUser!: UserDTO | undefined;

  constructor(
    private modalController: ModalController,
    private readonly _flightFacade: FlightFacade,
    private readonly _currentUserFacade: CurrentUserFacade
  ) {}

  ngOnInit(): void {
    this._currentUserFacade.userDetails$.subscribe(
      (user) => (this.currentUser = user)
    );
  }

  async dismiss() {
    this.modalController.dismiss(undefined, undefined, 'flight-bookings');
    await this.modalController.dismiss();
    this._flightFacade.resetApiFlightBookingsList();
  }

  handleSaveFlight(flight: FlightDTO) {
    if (this.byAdmin == true) this._flightFacade.addFlight(flight);
    else {
      this._flightFacade.createFlightAndAssignUser(flight, this.currentUser?.id);
    }
  }

  async openConfirmationModal(flight: FlightDTO) {
    const modal = await this.modalController.create({
      component: ConfirmationModalComponent,
      cssClass: 'confirmation-modal',
      componentProps: {
        content: 'Are you sure you would like to save this flight booking?',
      },
    });

    await modal.present();

    const { data } = await modal.onWillDismiss();
    if (data && data.confirm) {
      this.handleSaveFlight(flight);
    }
  }
}
