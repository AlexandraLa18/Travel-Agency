import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IonicModule, ModalController } from '@ionic/angular';
import { FlightDTO } from 'src/app/shared/models/flightDTO';
import { IonHeader, IonButton } from "@ionic/angular/standalone";

@Component({
  selector: 'app-confirmation-modal',
  templateUrl: './confirmation-modal.component.html',
  styleUrls: ['./confirmation-modal.component.scss'],
  imports: [IonicModule],
  standalone: true
})
export class ConfirmationModalComponent {
  @Input() content!: string;

  constructor(private modalController: ModalController) {}

  async dismiss(confirm: boolean) {
    await this.modalController.dismiss({ confirm: confirm });
  }
}
