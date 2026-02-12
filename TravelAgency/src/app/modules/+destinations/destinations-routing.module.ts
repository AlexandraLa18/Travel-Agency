import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DestinationsListComponent } from './components/destinations-list/destinations-list.component';

const routes: Routes = [
  {
    path: '',
    component: DestinationsListComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DestinationsRoutingModule {}
