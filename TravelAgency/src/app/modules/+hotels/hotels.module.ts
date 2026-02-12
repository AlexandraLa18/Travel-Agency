import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HotelsRoutingModule } from './hotels-routing.module';
import { HotelsListComponent } from './components/hotels-list/hotels-list.component';
import { IonicModule } from '@ionic/angular';
import { TableWrapperModule } from 'src/app/shared/table-wrapper/table-wrapper/table-wrapper.module';
import { MatIconModule } from '@angular/material/icon';
import { DialogComponent } from 'src/app/standalone-components/dialog/dialog.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OpsFormModule } from 'src/app/shared/modules/form/form.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { HotelDetailsViewComponent } from './components/hotel-details-view/hotel-details-view.component';
import { ApiHotelBookingsListComponent } from './components/api-hotel-bookings-list/api-hotel-bookings-list.component';
import { ConfirmationModalComponent } from '../+flights/components/confirmation-modal/confirmation-modal.component';
import { HotelFilterComponent } from './components/hotel-filter/hotel-filter.component';

@NgModule({
  declarations: [HotelsListComponent, HotelDetailsViewComponent, ApiHotelBookingsListComponent, HotelFilterComponent],
  imports: [
    CommonModule,
    HotelsRoutingModule,
    IonicModule,
    TableWrapperModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    OpsFormModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    
    //standalone components
    DialogComponent,
    ConfirmationModalComponent
  ],
  exports: [HotelDetailsViewComponent]
})
export class HotelsModule {}
