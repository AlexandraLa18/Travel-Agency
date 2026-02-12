import { Component, OnInit, inject } from '@angular/core';
import { AuthFacade } from 'src/app/modules/+auth/state/auth.facade';
import { VacationsComponent } from '../vacations/vacations.component';
import { ModalController } from '@ionic/angular';
import { HotelsComponent } from '../hotels/hotels.component';
import { FlightsComponent } from '../flights/flights.component';
import { ReservationsFacade } from '../../state/user-reservations.facade';
import { CurrentUserFacade } from 'src/app/shared/state/current-user/current-user.facade';
import { UserDTO } from 'src/app/shared/models/userDTO.model';
import { SessionStorageService } from 'src/app/core/storage/services/session-storage.service';
import { CURRENT_USER_ID_SESSION_STORAGE } from 'src/app/core/storage/constants/local-storage.const';
import { SimpleVacationsComponent } from '../simple-vacations/simple-vacations.component';

@Component({
  selector: 'app-reservations',
  templateUrl: './reservations.component.html',
  styleUrls: ['./reservations.component.scss'],
})
export class ReservationsComponent implements OnInit {
  currentUser!: UserDTO | undefined;
  userId!: number;

  constructor(
    private readonly _authFacade: AuthFacade,
    private modalController: ModalController,
    private readonly _reservationsFacade: ReservationsFacade,
    private readonly _currentUserFacade: CurrentUserFacade,
    private readonly _sessionStorageService: SessionStorageService
  ) {
    const sessionStorage = inject(SessionStorageService);
    this.userId = sessionStorage.getItem(CURRENT_USER_ID_SESSION_STORAGE) as number;
  }

  ngOnInit() {
    this._currentUserFacade.userDetails$.subscribe(
      (user) => (this.currentUser = user)
    );


  }

  logout() {
    this._authFacade.logout();
  }

  async onVacationCardClick() {
    this._reservationsFacade.loadVacations(this.userId);

    const modal = await this.modalController.create({
      component: VacationsComponent,
      id: 'user-vacations',
      componentProps: {
      },
    });
    return await modal.present();
  }

  async onHotelCardClick() {
    this._reservationsFacade.loadHotels(this.userId);

    const modal = await this.modalController.create({
      component: HotelsComponent,
      id: 'user-hotels',
      componentProps: {
      },
    });
    return await modal.present();
  }

  async onFlightCardClick() {
    this._reservationsFacade.loadFlights(this.userId);

     const modal = await this.modalController.create({
      component: FlightsComponent,
      id: 'user-flights',
      componentProps: {
      },
    });
    return await modal.present();
  }

  async onSimpleVacationsCardClick() {
    this._reservationsFacade.loadSimpleVacations(this.userId);

    const modal = await this.modalController.create({
     component: SimpleVacationsComponent,
     id: 'user-flights',
     componentProps: {
     },
   });
   return await modal.present();
  }
}
