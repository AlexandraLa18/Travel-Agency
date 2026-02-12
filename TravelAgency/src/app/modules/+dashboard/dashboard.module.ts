import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { IonicModule } from '@ionic/angular';
import { NgxsModule } from '@ngxs/store';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OpsFormModule } from 'src/app/shared/modules/form/form.module';
import { SimpleVacationCardComponent } from './components/simple-vacation-card/simple-vacation-card.component';
import { DestinationHotelBookingsComponent } from './components/destination-hotel-bookings/destination-hotel-bookings.component';
import { HotelsModule } from '../+hotels/hotels.module';
import { SearchHotelsByCityPeriodComponent } from './components/search-hotels-by-city-period/search-hotels-by-city-period.component';
import { VacationCardComponent } from '../+flight-hotel/components/vacation-card/vacation-card.component';


@NgModule({
  declarations: [DashboardComponent, SimpleVacationCardComponent, DestinationHotelBookingsComponent, SearchHotelsByCityPeriodComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    IonicModule,
    FormsModule,
    OpsFormModule,
    ReactiveFormsModule,
    HotelsModule,
  ],
  exports: [SimpleVacationCardComponent]
})
export class DashboardModule { }
