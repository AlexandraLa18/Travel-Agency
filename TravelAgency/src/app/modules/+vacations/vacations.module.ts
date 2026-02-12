import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VacationsRoutingModule } from './vacations-routing.module';
import { IonicModule } from '@ionic/angular';
import { VacationsListComponent } from './components/vacations-list/vacations-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { OpsFormModule } from 'src/app/shared/modules/form/form.module';
import { TableWrapperModule } from 'src/app/shared/table-wrapper/table-wrapper/table-wrapper.module';
import { DialogComponent } from 'src/app/standalone-components/dialog/dialog.component';
import { ConfirmationModalComponent } from '../+flights/components/confirmation-modal/confirmation-modal.component';
import { HotelsModule } from '../+hotels/hotels.module';
import { FlightsModule } from '../+flights/flights.module';
import { HotelBookingsListComponent } from './components/hotel-bookings-list/hotel-bookings-list.component';
import { FlightBookingsListComponent } from './components/flight-bookings-list/flight-bookings-list.component';
import { VacationDetailsViewComponent } from './components/vacation-details-view/vacation-details-view.component';

@NgModule({
  declarations: [VacationsListComponent, HotelBookingsListComponent, FlightBookingsListComponent, VacationDetailsViewComponent],
  imports: [
    CommonModule,
    VacationsRoutingModule,
    IonicModule,
    TableWrapperModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    OpsFormModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    HotelsModule,
    FlightsModule,
    
    //standalone components
    DialogComponent,
    ConfirmationModalComponent
  ]
})
export class VacationsModule {}
