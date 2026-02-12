import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FlightFacade } from 'src/app/modules/+flights/state/flights.facade';
import { HotelFacade } from 'src/app/modules/+hotels/state/hotel.facade';
import { VacationsFacade } from 'src/app/modules/+vacations/state/vacations.facade';
import { UserDTO } from 'src/app/shared/models/userDTO.model';
import { CurrentUserFacade } from 'src/app/shared/state/current-user/current-user.facade';
import { HotelsListFromApiComponent } from '../hotels-list-from-api/hotels-list-from-api.component';
import { FlightsListFromApiComponent } from '../flights-list-from-api/flights-list-from-api.component';
import { ConfirmationModalComponent } from 'src/app/modules/+flights/components/confirmation-modal/confirmation-modal.component';
import { VacationRequest } from 'src/app/shared/models/vacationRequest';
import { HotelDTO } from 'src/app/shared/models/hotelDTO';
import { FlightDTO } from 'src/app/shared/models/flightDTO';

@Component({
  selector: 'app-create-vacation-by-user',
  templateUrl: './create-vacation-by-user.component.html',
  styleUrls: ['./create-vacation-by-user.component.scss'],
})
export class CreateVacationByUserComponent implements OnInit {
  @Input() from!: string;
  @Input() to!: string;
  @Input() checkin!: string;
  @Input() checkout!: string;
  @Input() rooms!: number;
  @Input() adults!: number;
  @Input() fromDestinationEntityId!: string;
  @Input() toDestinationEntityId!: string;

  readonly selectedHotelBooking$ = this._hotelFacade.selectedHotelBooking$;
  readonly selectedFlightBooking$ = this._flightFacade.selectedFlightBooking$;
  readonly hotelIsSelected$ = this._hotelFacade.hotelIsSelected$;
  readonly flightIsSelected$ = this._flightFacade.flightIsSelected$;

  currentUser!: UserDTO | undefined;
  selectedHotel!: HotelDTO;
  selectedFlight!: FlightDTO;

  constructor(
    private modalController: ModalController,
    private readonly _hotelFacade: HotelFacade,
    private readonly _flightFacade: FlightFacade,
    private readonly _vacationFacade: VacationsFacade,
    private readonly _currentUserFacade: CurrentUserFacade
  ) {}

  ngOnInit(): void {
    this._currentUserFacade.userDetails$.subscribe(
      (user) => (this.currentUser = user)
    );

    this.selectedHotelBooking$.subscribe(value => this.selectedHotel = value);
    this.selectedFlightBooking$.subscribe(value => this.selectedFlight = value);
  }

  async dismiss() {
    this.modalController.dismiss(undefined, undefined, 'hotel-bookings');
    await this.modalController.dismiss();
    this._hotelFacade.resetApiHotelBookingsList();
    this._flightFacade.resetApiFlightBookingsList();
  }

  async searchHotels() {
    const modal = await this.modalController.create({
      component: HotelsListFromApiComponent,
      componentProps: {
        title: this.to,
        checkin: this.checkin,
        checkout: this.checkout
      },
    });
    return await modal.present();
  }

  async searchFlights() {
    const modal = await this.modalController.create({
      component: FlightsListFromApiComponent,
      componentProps: {
        title: this.from + ' - ' + this.to,
        checkin: this.checkin,
        checkout: this.checkout
      },
    });
    return await modal.present();
  }

  async saveVacationByUser() {
    const modal = await this.modalController.create({
      component: ConfirmationModalComponent,
      cssClass: 'confirmation-modal',
      componentProps: { content: 'Are you sure you would like to save this vacation?' }
    });

    await modal.present();

    const { data } = await modal.onWillDismiss();
    if (data && data.confirm) {
      this.saveVacationForUser();
    }
  }

  saveVacationForUser() {
    const requestBody: VacationRequest = { hotel: this.selectedHotel, flight: this.selectedFlight, userId: this.currentUser?.id };
    this._vacationFacade.createVacationByUser(requestBody);
    this._hotelFacade.resetSelectedHotelBooking();
    this._flightFacade.resetSelectedFlightBooking();
  }
}
