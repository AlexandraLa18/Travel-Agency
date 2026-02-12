import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DestinationsRoutingModule } from './destinations-routing.module';
import { DestinationsListComponent } from './components/destinations-list/destinations-list.component';
import { IonicModule } from '@ionic/angular';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { DestinationState } from './state/destinations.state';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { NgxsModule } from '@ngxs/store';
import { OpsFormModule } from 'src/app/shared/modules/form/form.module';
import { TableWrapperModule } from 'src/app/shared/table-wrapper/table-wrapper/table-wrapper.module';
import { DialogComponent } from 'src/app/standalone-components/dialog/dialog.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

@NgModule({
  declarations: [DestinationsListComponent],
  imports: [
    CommonModule,
    DestinationsRoutingModule,
    IonicModule,
    TableWrapperModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    OpsFormModule,
    MatAutocompleteModule,
    MatInputModule,
    MatFormFieldModule,

    //standalone components
    DialogComponent
  ]
})
export class DestinationsModule {}
