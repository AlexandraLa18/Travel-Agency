import { Component, Input } from '@angular/core';
import { IonicModule, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-info-modal',
  templateUrl: './info-modal.component.html',
  styleUrls: ['./info-modal.component.scss'],
  imports: [IonicModule],
  standalone: true
})
export class InfoModalComponent {
  @Input() content!: string;
  @Input() title!: string;

  constructor(private modalController: ModalController) {}

  async dismiss(confirm: boolean) {
    await this.modalController.dismiss({ confirm: confirm });
  }
}
