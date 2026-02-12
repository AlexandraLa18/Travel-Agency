import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FlightDTO } from 'src/app/shared/models/flightDTO';

@Component({
  selector: 'app-flight-details-view',
  templateUrl: './flight-details-view.component.html',
  styleUrls: ['./flight-details-view.component.scss'],
})
export class FlightDetailsViewComponent {
  @Input() flight!: FlightDTO;
  @Input() isSelectButtonVisible: boolean = false;
  @Input() buttonLabel: string = 'SELECT';
  @Output() openConfirmationModal: EventEmitter<FlightDTO> = new EventEmitter<FlightDTO>();
  isDisabled = false;
  constructor(private modalController: ModalController) {}

  async dismiss() {
    await this.modalController.dismiss();
  }
  close(modal: any){
    modal.dismiss();
  }

  openConfirmationModalFunction(){
    this.openConfirmationModal.emit(this.flight);
    this.isDisabled = true;
  }
}
