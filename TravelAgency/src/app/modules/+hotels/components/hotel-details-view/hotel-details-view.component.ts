import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { HotelDTO } from 'src/app/shared/models/hotelDTO';

@Component({
  selector: 'app-hotel-details-view',
  templateUrl: './hotel-details-view.component.html',
  styleUrls: ['./hotel-details-view.component.scss'],
})
export class HotelDetailsViewComponent {
  @Input() hotel!: HotelDTO;
  @Input() isSelectButtonVisible: boolean = false;
  @Input() buttonLabel: string = 'SELECT';
  @Output() openConfirmationModal: EventEmitter<HotelDTO> = new EventEmitter<HotelDTO>();
  isDisabled = false;
  
  constructor(private modalController: ModalController) {}

  async dismiss() {
    await this.modalController.dismiss();
  }
  close(modal: any){
    modal.dismiss();
  }

  openConfirmationModalFunction(){
    this.openConfirmationModal.emit(this.hotel);
  }
}
