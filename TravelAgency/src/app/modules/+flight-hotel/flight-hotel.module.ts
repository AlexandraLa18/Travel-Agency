import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FlightHotelRoutingModule } from './flight-hotel-routing.module';
import { FlightHotelComponent } from './components/flight-hotel/flight-hotel.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { OpsFormModule } from 'src/app/shared/modules/form/form.module';
import { HotelsModule } from '../+hotels/hotels.module';
import { VacationBookingsComponent } from './components/vacation-bookings/vacation-bookings.component';
import { VacationCardComponent } from './components/vacation-card/vacation-card.component';
import { FlightsModule } from '../+flights/flights.module';
import { VacationBigCardComponent } from './components/vacation-big-card/vacation-big-card.component';
import { StarArrayPipe } from 'src/app/shared/pipes/star-array.pipe';
import { InfoModalComponent } from 'src/app/shared/components/info-modal/info-modal.component';
import { CreateVacationByUserComponent } from './components/create-vacation-by-user/create-vacation-by-user.component';
import { HotelsListFromApiComponent } from './components/hotels-list-from-api/hotels-list-from-api.component';
import { FlightsListFromApiComponent } from './components/flights-list-from-api/flights-list-from-api.component';

@NgModule({
  declarations: [VacationBigCardComponent, FlightHotelComponent, VacationBookingsComponent, VacationCardComponent, CreateVacationByUserComponent, HotelsListFromApiComponent, FlightsListFromApiComponent],
  imports: [
    CommonModule,
    FlightHotelRoutingModule,
    IonicModule,
    FormsModule,
    OpsFormModule,
    ReactiveFormsModule,
    HotelsModule,
    FlightsModule,

    //pipes
    StarArrayPipe,

    //standalone components
    InfoModalComponent
  ],
  exports: [VacationCardComponent]
})
export class FlightHotelModule { }
