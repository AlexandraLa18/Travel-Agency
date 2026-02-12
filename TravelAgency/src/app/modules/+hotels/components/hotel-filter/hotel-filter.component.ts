import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-hotel-filter',
  templateUrl: './hotel-filter.component.html',
  styleUrls: ['./hotel-filter.component.scss'],
})
export class HotelFilterComponent {
  constructor(private modalController: ModalController) {}

  async dismiss(confirm: boolean) {
    await this.modalController.dismiss({ confirm: confirm });
  }
}
