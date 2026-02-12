import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { VacationDTO } from 'src/app/shared/models/vacationDTO';

@Component({
  selector: 'app-vacation-details-view',
  templateUrl: './vacation-details-view.component.html',
  styleUrls: ['./vacation-details-view.component.scss'],
})
export class VacationDetailsViewComponent {
  @Input() vacation!: VacationDTO;

}
