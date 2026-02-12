import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserTabsComponent } from './components/user-tabs/user-tabs.component';

const routes: Routes = [
  {
    path: '',
    component: UserTabsComponent,
    children: [
      {
        path: 'dashboard',
        loadChildren: () =>
          import('../+dashboard/dashboard.module').then(
            (m) => m.DashboardModule
          ),
      },
      {
        path: 'flightHotel',
        loadChildren: () =>
          import('../+flight-hotel/flight-hotel.module').then(
            (m) => m.FlightHotelModule
          ),
      },
      {
        path: 'flights',
        loadChildren: () =>
          import('../+user-flights/user-flights.module').then(
            (m) => m.UserFlightsModule
          ),
      },
      {
        path: 'reservations',
        loadChildren: () =>
          import('../+user-reservations/user-reservations.module').then((m) => m.UserReservationsModule),
      },
      {
        path: '',
        redirectTo: '/user-tabs/dashboard',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '',
    redirectTo: '/user-tabs/dashboard',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserTabsRoutingModule {}
