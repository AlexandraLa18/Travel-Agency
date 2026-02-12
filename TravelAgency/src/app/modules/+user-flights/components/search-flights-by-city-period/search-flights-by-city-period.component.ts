import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ConfirmationModalComponent } from 'src/app/modules/+flights/components/confirmation-modal/confirmation-modal.component';
import { FlightFacade } from 'src/app/modules/+flights/state/flights.facade';
import { FlightDTO } from 'src/app/shared/models/flightDTO';
import { UserDTO } from 'src/app/shared/models/userDTO.model';
import { CurrentUserFacade } from 'src/app/shared/state/current-user/current-user.facade';

@Component({
  selector: 'app-search-flights-by-city-period',
  templateUrl: './search-flights-by-city-period.component.html',
  styleUrls: ['./search-flights-by-city-period.component.scss'],
})
export class SearchFlightsByCityPeriodComponent  implements OnInit {
  @Input() title!: string;
  @Input() checkin!: string;
  @Input() checkout!: string;
  @Input() rooms!: number;
  @Input() adults!: number;
  @Input() destinationEntityId!: string;
  
  readonly total$ = this._flightFacade.apiFlightsTotal$;
  readonly apiFlights$ = this._flightFacade.apiFlights$;
  readonly apiFlightsLoading$ = this._flightFacade.apiFlightsLoading$;
  readonly apiFlightsDataNotFound$ = this._flightFacade.apiFlightsDataNotFound$;
  readonly currentUser$ = this._currentUserFacade.userDetails$;

  currentUser!: UserDTO | undefined;

  constructor(
    private modalController: ModalController,
    private readonly _flightFacade: FlightFacade,
    private readonly _currentUserFacade: CurrentUserFacade,
  ) {}

  ngOnInit(): void {
    this._currentUserFacade.userDetails$.subscribe(user => this.currentUser = user);
  }

  async dismiss() {
    this.modalController.dismiss(undefined, undefined, 'flight-bookings');
    await this.modalController.dismiss();
    this._flightFacade.resetApiFlightBookingsList();
  }

  handleSaveFlightForUser(flight: FlightDTO) {
    this._flightFacade.createFlightAndAssignUser(flight, this.currentUser?.id);
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
      this.handleSaveFlightForUser(flight);
    }
  }
}
