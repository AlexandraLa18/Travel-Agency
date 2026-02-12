import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ConfirmationModalComponent } from 'src/app/modules/+flights/components/confirmation-modal/confirmation-modal.component';
import { VacationsFacade } from 'src/app/modules/+vacations/state/vacations.facade';
import { UserDTO } from 'src/app/shared/models/userDTO.model';
import { VacationDTO } from 'src/app/shared/models/vacationDTO';
import { CurrentUserFacade } from 'src/app/shared/state/current-user/current-user.facade';
import { CreateVacationByUserComponent } from '../create-vacation-by-user/create-vacation-by-user.component';
import { HotelFacade } from 'src/app/modules/+hotels/state/hotel.facade';
import { FlightFacade } from 'src/app/modules/+flights/state/flights.facade';

@Component({
  selector: 'app-vacation-bookings',
  templateUrl: './vacation-bookings.component.html',
  styleUrls: ['./vacation-bookings.component.scss'],
})
export class VacationBookingsComponent implements OnInit {
  @Input() title!: string;
  @Input() to!: string;
  @Input() from!: string;
  @Input() checkin!: string;
  @Input() checkout!: string;
  @Input() adults!: number;
  @Input() byCity = false;
  @Input() fromEntityId!: string;
  @Input() toEntityId!: string;

  readonly vacationsByCityPeriodAdults$ = this._vacationsFacade.vacationsByCityPeriodAdults$;
  readonly vacationsByCity$ = this._vacationsFacade.vacationsByCity$;
  readonly currentUser$ = this._currentUserFacade.userDetails$;

  currentUser!: UserDTO | undefined;

  constructor(
    private modalController: ModalController,
    private readonly _vacationsFacade: VacationsFacade,
    private readonly _currentUserFacade: CurrentUserFacade,
    private readonly _hotelFacade: HotelFacade,
    private readonly _flightFacade: FlightFacade
  ) {}

  ngOnInit(): void {
    this._currentUserFacade.userDetails$.subscribe(
      (user) => (this.currentUser = user)
    );
  }

  async dismiss() {
    this.modalController.dismiss(undefined, undefined, 'hotel-bookings');
    await this.modalController.dismiss();

    if (this.byCity) this._vacationsFacade.resetVacationsByCityList();
    else this._vacationsFacade.resetVacationsByCityPeriodAdults();
  }

  async openConfirmationModal(vacation: VacationDTO) {
    const modal = await this.modalController.create({
      component: ConfirmationModalComponent,
      cssClass: 'confirmation-modal',
      componentProps: {
        content: 'Are you sure you would like to save this vacation package?',
      },
    });

    await modal.present();

    const { data } = await modal.onWillDismiss();
    if (data && data.confirm) {
      this.handleSaveVacationForUser(vacation);
    }
  }

  handleSaveVacationForUser(vacation: VacationDTO) {
    this._vacationsFacade.assignUserToVacation(
      vacation.vacation_id,
      this.currentUser?.id,
      this.byCity
    );
  }

  async createVacationByUser() {    
    //search hotels in api
    this._hotelFacade.loadApiHotelsList(this.toEntityId, this.checkin, this.checkout, 1, this.adults, 15, 1 );
      
    //search flights in api
    this._flightFacade.loadApiFlightsList(this.from, this.to, this.checkin, this.checkout, this.adults, 'economy' );

    const modal = await this.modalController.create({
      component: CreateVacationByUserComponent,
      componentProps: {
        from: this.from,
        to: this.to,
        checkin: this.checkin,
        checkout: this.checkout,
        rooms: 1,
        adults: this.adults,
      },
    });
    return await modal.present();
  } 
}
