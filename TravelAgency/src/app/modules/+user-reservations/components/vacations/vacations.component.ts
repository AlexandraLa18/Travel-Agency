import { Component } from '@angular/core';
import { ReservationsFacade } from '../../state/user-reservations.facade';
import { VacationDTO } from 'src/app/shared/models/vacationDTO';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { ConfirmationModalComponent } from 'src/app/modules/+flights/components/confirmation-modal/confirmation-modal.component';

@Component({
  selector: 'app-vacations',
  templateUrl: './vacations.component.html',
  styleUrls: ['./vacations.component.scss'],
})
export class VacationsComponent {
  readonly vacations$ = this._reservationsFacade.vacations$;

  constructor(
    private modalController: ModalController,
    private readonly _reservationsFacade: ReservationsFacade,
    private readonly _router: Router
  ) {}
  
  async dismiss() {
    await this.modalController.dismiss();
  }


  handleCancelVacation(vacationDTO: VacationDTO) {
    this._reservationsFacade.cancelVacation(vacationDTO.vacation_id);
  }

  async openConfirmationModal(vacation: VacationDTO){
    const modal = await this.modalController.create({
      component: ConfirmationModalComponent,
      cssClass: 'confirmation-modal',
      componentProps: { content: 'Are you sure you would like to cancel this vacation booking?' }
    });

    await modal.present();

    const { data } = await modal.onWillDismiss();
    if (data && data.confirm) {
      this.handleCancelVacation(vacation);
    }
  }
}