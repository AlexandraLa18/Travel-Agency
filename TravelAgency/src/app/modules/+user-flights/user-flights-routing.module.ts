import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserFlightsComponent } from './components/user-flights/user-flights.component';

const routes: Routes = [{
  path: '',
  component: UserFlightsComponent
}];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserFlightsRoutingModule { }
