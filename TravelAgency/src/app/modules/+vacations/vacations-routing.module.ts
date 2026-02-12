import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VacationsListComponent } from './components/vacations-list/vacations-list.component';

const routes: Routes = [{
  path: '',
  component: VacationsListComponent
}];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VacationsRoutingModule { }
