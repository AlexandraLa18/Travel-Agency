import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ConfirmationModalComponent } from 'src/app/modules/+flights/components/confirmation-modal/confirmation-modal.component';
import { HotelFacade } from 'src/app/modules/+hotels/state/hotel.facade';
import { VacationsFacade } from 'src/app/modules/+vacations/state/vacations.facade';
import { HotelDTO } from 'src/app/shared/models/hotelDTO';
import { SimpleVacationRequest } from 'src/app/shared/models/simpleVacationRequest';
import { UserDTO } from 'src/app/shared/models/userDTO.model';
import { CurrentUserFacade } from 'src/app/shared/state/current-user/current-user.facade';

@Component({
  selector: 'app-search-hotels-by-city-period',
  templateUrl: './search-hotels-by-city-period.component.html',
  styleUrls: ['./search-hotels-by-city-period.component.scss'],
})
export class SearchHotelsByCityPeriodComponent implements OnInit {
  @Input() title!: string;
  @Input() checkin!: string;
  @Input() checkout!: string;
  @Input() rooms!: number;
  @Input() adults!: number;
  @Input() destinationEntityId!: string;
  
  readonly total$ = this._hotelFacade.apiHotelsTotal$;
  readonly apiHotels$ = this._hotelFacade.apiHotels$;
  readonly apiHotelsLoading$ = this._hotelFacade.apiHotelsLoading$;
  readonly apiHotelsDataNotFound$ = this._hotelFacade.apiHotelsDataNotFound$;
  readonly currentUser$ = this._currentUserFacade.userDetails$;

  currentUser!: UserDTO | undefined;

  constructor(
    private modalController: ModalController,
    private readonly _hotelFacade: HotelFacade,
    private readonly _vacationFacade: VacationsFacade,
    private readonly _currentUserFacade: CurrentUserFacade,
  ) {}

  ngOnInit(): void {
    this._currentUserFacade.userDetails$.subscribe(user => this.currentUser = user);
  }

  async dismiss() {
    this.modalController.dismiss(undefined, undefined, 'hotel-bookings');
    await this.modalController.dismiss();
    this._hotelFacade.resetApiHotelBookingsList();
  }

  handleSaveHotelForUser(hotel: HotelDTO) {
    this._hotelFacade.createHotelAndAssignUser(hotel, this.currentUser?.id);
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
      this.handleSaveHotelForUser(hotel);
    }
  }
}
