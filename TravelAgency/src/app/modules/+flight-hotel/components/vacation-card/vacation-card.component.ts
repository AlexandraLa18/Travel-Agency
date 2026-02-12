import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { VacationDTO } from 'src/app/shared/models/vacationDTO';
import { VacationBigCardComponent } from '../vacation-big-card/vacation-big-card.component';

@Component({
  selector: 'app-vacation-card',
  templateUrl: './vacation-card.component.html',
  styleUrls: ['./vacation-card.component.scss'],
})
export class VacationCardComponent {
  @Input() vacation!: VacationDTO;
  @Input() isSelectButtonVisible = false;
  @Input() buttonLabel: string = 'SELECT';
  @Output() openConfirmationModal: EventEmitter<VacationDTO> =
    new EventEmitter<VacationDTO>();
  isDisabled = false;

  constructor(private modalController: ModalController) {}

  async dismiss() {
    await this.modalController.dismiss();
  }
  close(modal: any) {
    modal.dismiss();
  }

  openConfirmationModalFunction(event: Event): void {
    event.stopPropagation();
    this.openConfirmationModal.emit(this.vacation);
  }

  async onCardClick() {
    const modal = await this.modalController.create({
      component: VacationBigCardComponent,
      componentProps: {
        vacation: this.vacation,
      },
    });
    await modal.present();
  }
}
