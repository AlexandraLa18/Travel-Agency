import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ConfirmationModalComponent } from 'src/app/modules/+flights/components/confirmation-modal/confirmation-modal.component';
import { FlightFacade } from 'src/app/modules/+flights/state/flights.facade';
import { FlightDTO } from 'src/app/shared/models/flightDTO';
import { UserDTO } from 'src/app/shared/models/userDTO.model';
import { CurrentUserFacade } from 'src/app/shared/state/current-user/current-user.facade';
import { SearchFlightsByCityPeriodComponent } from '../search-flights-by-city-period/search-flights-by-city-period.component';

@Component({
  selector: 'app-flights-list',
  templateUrl: './flights-list.component.html',
  styleUrls: ['./flights-list.component.scss'],
})
export class FlightsListComponent implements OnInit {
  @Input() title!: string;
  @Input() checkin!: string;
  @Input() checkout!: string;
  @Input() byCity = false;
  @Input() adults!: number;
  @Input() from!: string;
  @Input() to!: string;
  @Input() cabinClass!: string;

  readonly flightsByCity$ = this._flightFacade.flightsByCity$;
  readonly flightsByCityLoading$ = this._flightFacade.flightsByCityLoading$;
  readonly flightsByCityDataNotFound$ =
    this._flightFacade.flightsByCityDataNotFound$;

  readonly flightsByCityPeriodAdults$ = this._flightFacade.flightBookings$;
  readonly flightBookingsDataNotFound$ =
    this._flightFacade.flightBookingsDataNotFound$;

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
    this._flightFacade.assignUserToFlight(
      flight.flight_id,
      this.currentUser?.id
    );
  }

  async searchFlightsByCityPeriod() {
    this._flightFacade.loadApiFlightsList(
      this.from,
      this.to,
      this.checkin,
      this.checkout,
      this.adults,
      this.cabinClass
    );

    const modal = await this.modalController.create({
      component: SearchFlightsByCityPeriodComponent,
      componentProps: {
        title: this.from + '    -    ' + this.to,
        checkin: this.checkin,
        checkout: this.checkout,
        cabinClass: this.cabinClass,
        adults: this.adults,
        byAdmin: false,
      },
    });
    return await modal.present();

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
