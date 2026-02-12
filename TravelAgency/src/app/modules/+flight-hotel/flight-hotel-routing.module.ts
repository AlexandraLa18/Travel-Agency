import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FlightHotelComponent } from './components/flight-hotel/flight-hotel.component';

const routes: Routes = [{
  path: '',
  component: FlightHotelComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FlightHotelRoutingModule { }
