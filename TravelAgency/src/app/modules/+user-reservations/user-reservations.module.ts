import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserReservationsRoutingModule } from './user-reservations-routing.module';
import { ReservationsComponent } from './components/reservations/reservations.component';
import { IonicModule } from '@ionic/angular';
import { HotelsComponent } from './components/hotels/hotels.component';
import { FlightsComponent } from './components/flights/flights.component';
import { VacationsComponent } from './components/vacations/vacations.component';
import { FlightHotelModule } from '../+flight-hotel/flight-hotel.module';
import { FlightsModule } from '../+flights/flights.module';
import { HotelsModule } from '../+hotels/hotels.module';
import { SimpleVacationsComponent } from './components/simple-vacations/simple-vacations.component';
import { DashboardModule } from '../+dashboard/dashboard.module';
import { SimpleVacationCardComponent } from '../+dashboard/components/simple-vacation-card/simple-vacation-card.component';



@NgModule({
  declarations: [ReservationsComponent, HotelsComponent, FlightsComponent, VacationsComponent, SimpleVacationsComponent],
  imports: [
    CommonModule,
    UserReservationsRoutingModule,
    IonicModule,
    FlightHotelModule,
    FlightsModule,
    HotelsModule,
    DashboardModule
  ]
})
export class UserReservationsModule { }
