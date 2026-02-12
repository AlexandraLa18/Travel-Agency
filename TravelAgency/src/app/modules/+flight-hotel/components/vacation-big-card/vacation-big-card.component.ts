import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ConfirmationModalComponent } from 'src/app/modules/+flights/components/confirmation-modal/confirmation-modal.component';
import { InfoModalComponent } from 'src/app/shared/components/info-modal/info-modal.component';
import { VacationDTO } from 'src/app/shared/models/vacationDTO';

@Component({
  selector: 'app-vacation-big-card',
  templateUrl: './vacation-big-card.component.html',
  styleUrls: ['./vacation-big-card.component.scss'],
})
export class VacationBigCardComponent {
  @Input() vacation!: VacationDTO;
  @Input() isSelectButtonVisible = false;
  @Output() openConfirmationModal: EventEmitter<VacationDTO> =
    new EventEmitter<VacationDTO>();

  constructor(private modalController: ModalController) {}

  async dismiss() {
    await this.modalController.dismiss();
  }

  close(modal: any) {
    modal.dismiss();
  }

  openConfirmationModalFunction() {
    this.openConfirmationModal.emit(this.vacation);
  }

  async showHotelDescription() {
    const modal = await this.modalController.create({
      component: InfoModalComponent,
      cssClass: 'confirmation-modal info-modal',
      componentProps: {
        content: this.vacation.hotel.description,
        title: 'Hotel Description',
      },
    });

    await modal.present();
  }
}
