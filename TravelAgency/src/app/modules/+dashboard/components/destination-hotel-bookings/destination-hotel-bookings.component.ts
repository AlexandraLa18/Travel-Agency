import { Component, Input, OnInit, input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ConfirmationModalComponent } from 'src/app/modules/+flights/components/confirmation-modal/confirmation-modal.component';
import { HotelFacade } from 'src/app/modules/+hotels/state/hotel.facade';
import { VacationsFacade } from 'src/app/modules/+vacations/state/vacations.facade';
import { SimpleVacationDTO } from 'src/app/shared/models/simpleVacationDTO';
import { UserDTO } from 'src/app/shared/models/userDTO.model';
import { CurrentUserFacade } from 'src/app/shared/state/current-user/current-user.facade';
import { SearchHotelsByCityPeriodComponent } from '../search-hotels-by-city-period/search-hotels-by-city-period.component';

@Component({
  selector: 'app-destination-hotel-bookings',
  templateUrl: './destination-hotel-bookings.component.html',
  styleUrls: ['./destination-hotel-bookings.component.scss'],
})
export class DestinationHotelBookingsComponent implements OnInit {
  @Input() destinationName!: string;
  @Input() title!: string;
  @Input() checkin?: string;
  @Input() checkout?: string;
  @Input() adults?: number;
  @Input() byCity = false;

  readonly simpleVacationsByCityPeriodAdults$ =
    this._vacationsFacade.simpleVacationsByCityPeriodAdults$;
  readonly simpleVacationsByCity$ =
    this._vacationsFacade.simpleVacationsByCity$;
  readonly currentUser$ = this._currentUserFacade.userDetails$;

  currentUser!: UserDTO | undefined;

  constructor(
    private modalController: ModalController,
    private readonly _vacationsFacade: VacationsFacade,
    private readonly _currentUserFacade: CurrentUserFacade,
    private readonly _hotelsFacade: HotelFacade
  ) {}

  ngOnInit(): void {
    this._currentUserFacade.userDetails$.subscribe(
      (user) => (this.currentUser = user)
    );
  }

  async dismiss() {
    this.modalController.dismiss(undefined, undefined, 'hotel-bookings');
    await this.modalController.dismiss();

    if (this.byCity) this._vacationsFacade.resetSimpleVacationsByCityList();
    else this._vacationsFacade.resetSimpleVacationsByCityPeriodAdults();
  }

  async openConfirmationModal(vacation: SimpleVacationDTO) {
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
      this.handleSaveSimpleVacationForUser(vacation);
    }
  }

  handleSaveSimpleVacationForUser(vacation: SimpleVacationDTO) {
    this._vacationsFacade.assignUserToSimpleVacation(
      vacation.simpleVacation_id,
      this.currentUser?.id,
      this.byCity
    );
  }

  async searchHotelsByCityPeriod() {
    this._hotelsFacade.loadApiHotelsListByDestinationCity(
      this.destinationName,
      this.checkin,
      this.checkout,
      1,
      this.adults,
      15,
      1
    );

    const modal = await this.modalController.create({
      component: SearchHotelsByCityPeriodComponent,
      componentProps: {
        title: this.destinationName,
        checkin: this.checkin,
        checkout: this.checkout,
        rooms: 1,
        adults: this.adults,
      },
    });
    return await modal.present();
  }
}
