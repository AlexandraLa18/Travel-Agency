import { Component, OnInit } from '@angular/core';
import { ReservationsFacade } from '../../state/user-reservations.facade';
import { SimpleVacationDTO } from 'src/app/shared/models/simpleVacationDTO';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { ConfirmationModalComponent } from 'src/app/modules/+flights/components/confirmation-modal/confirmation-modal.component';

@Component({
  selector: 'app-simple-vacations',
  templateUrl: './simple-vacations.component.html',
  styleUrls: ['./simple-vacations.component.scss'],
})
export class SimpleVacationsComponent {
  readonly simpleVacations$ = this._reservationsFacade.simpleVacations$;

  constructor(
    private modalController: ModalController,
    private readonly _reservationsFacade: ReservationsFacade,
    private readonly _router: Router
  ) {}

  async dismiss() {
    await this.modalController.dismiss();
  }

  handleCancelVacation(vacationDTO: SimpleVacationDTO) {
    console.log(vacationDTO.simpleVacation_id);
    this._reservationsFacade.cancelSimpleVacation(vacationDTO.simpleVacation_id);
  }

  async openConfirmationModal(vacation: SimpleVacationDTO) {
    const modal = await this.modalController.create({
      component: ConfirmationModalComponent,
      cssClass: 'confirmation-modal',
      componentProps: {
        content: 'Are you sure you would like to cancel this vacation booking?',
      },
    });

    await modal.present();

    const { data } = await modal.onWillDismiss();
    if (data && data.confirm) {
      this.handleCancelVacation(vacation);
    }
  }
}
