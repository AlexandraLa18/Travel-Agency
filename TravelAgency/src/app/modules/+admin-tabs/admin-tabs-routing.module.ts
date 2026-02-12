import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminTabsComponent } from './components/admin-tabs/admin-tabs.component';

const routes: Routes = [
  {
    path: '',
    component: AdminTabsComponent,
    children: [
      {
        path: 'destinations',
        loadChildren: () =>
          import('../+destinations/destinations.module').then((m) => m.DestinationsModule),
      },
      {
        path: 'hotels',
        loadChildren: () =>
          import('../+hotels/hotels.module').then((m) => m.HotelsModule),
      },
      {
        path: 'flights',
        loadChildren: () =>
          import('../+flights/flights.module').then((m) => m.FlightsModule),
      },
      {
        path: 'vacations',
        loadChildren: () =>
          import('../+vacations/vacations.module').then((m) => m.VacationsModule),
      },
      {
        path: 'users',
        loadChildren: () =>
          import('../+users/users.module').then((m) => m.UsersModule),
      },
      {
        path: '',
        redirectTo: '/admin-tabs/vacations',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '',
    redirectTo: '/admin-tabs/vacations',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminTabsRoutingModule {}
