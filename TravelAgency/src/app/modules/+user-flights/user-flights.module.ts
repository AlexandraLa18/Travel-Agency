import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserFlightsRoutingModule } from './user-flights-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { InfoModalComponent } from 'src/app/shared/components/info-modal/info-modal.component';
import { OpsFormModule } from 'src/app/shared/modules/form/form.module';
import { StarArrayPipe } from 'src/app/shared/pipes/star-array.pipe';
import { UserFlightsComponent } from './components/user-flights/user-flights.component';
import { FlightsListComponent } from './components/flights-list/flights-list.component';
import { FlightsModule } from '../+flights/flights.module';
import { SearchFlightsByCityPeriodComponent } from './components/search-flights-by-city-period/search-flights-by-city-period.component';

@NgModule({
  declarations: [SearchFlightsByCityPeriodComponent,UserFlightsComponent, FlightsListComponent],
  imports: [
    CommonModule,
    UserFlightsRoutingModule,
    IonicModule,
    FormsModule,
    OpsFormModule,
    ReactiveFormsModule,
    FlightsModule,

    //pipes
    StarArrayPipe,

    //standalone components
    InfoModalComponent,
  ],
})
export class UserFlightsModule {}
