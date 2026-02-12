import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { FlightsRoutingModule } from './flights-routing.module';
import { IonicModule } from '@ionic/angular';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { FlightsListComponent } from './components/flights-list/flights-list.component';
import { TableWrapperModule } from '../../shared/table-wrapper/table-wrapper/table-wrapper.module';
import { FlightState } from './state/flights.state';
import { NgxsModule } from '@ngxs/store';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ApiFlightBookingsListComponent } from './components/api-flight-bookings-list/api-flight-bookings-list.component';
import { FlightDetailsViewComponent } from './components/flight-details-view/flight-details-view.component';
import { ConfirmationModalComponent } from './components/confirmation-modal/confirmation-modal.component';

@NgModule({
  declarations: [FlightsListComponent, ApiFlightBookingsListComponent, FlightDetailsViewComponent],
  imports: [
    CommonModule,
    FlightsRoutingModule,
    IonicModule,
    TableWrapperModule,
    ReactiveFormsModule,
    FormsModule,

    ConfirmationModalComponent
  ],
  providers: [DatePipe],
  exports: [FlightDetailsViewComponent]
})
export class FlightsModule {}
