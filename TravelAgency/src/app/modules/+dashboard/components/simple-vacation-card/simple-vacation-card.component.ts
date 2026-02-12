import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { SimpleVacationDTO } from 'src/app/shared/models/simpleVacationDTO';

@Component({
  selector: 'app-simple-vacation-card',
  templateUrl: './simple-vacation-card.component.html',
  styleUrls: ['./simple-vacation-card.component.scss'],
})
export class SimpleVacationCardComponent {
  @Input() simpleVacation!: SimpleVacationDTO;
  @Input() isSelectButtonVisible = false;
  @Input() buttonLabel: string = 'SELECT';
  @Output() openConfirmationModal: EventEmitter<SimpleVacationDTO> = new EventEmitter<SimpleVacationDTO>();
  
  constructor(private modalController: ModalController) {}

  async dismiss() {
    await this.modalController.dismiss();
  }
  close(modal: any){
    modal.dismiss();
  }

  openConfirmationModalFunction(){
    this.openConfirmationModal.emit(this.simpleVacation);
  }
}
