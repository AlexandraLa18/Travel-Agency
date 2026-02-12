import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersRoutingModule } from './users-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { IonicModule } from '@ionic/angular';
import { OpsFormModule } from 'src/app/shared/modules/form/form.module';
import { TableWrapperModule } from 'src/app/shared/table-wrapper/table-wrapper/table-wrapper.module';
import { DialogComponent } from 'src/app/standalone-components/dialog/dialog.component';
import { ConfirmationModalComponent } from '../+flights/components/confirmation-modal/confirmation-modal.component';
import { UsersListComponent } from './components/users-list/users-list.component';
import { UsersState } from './state/users.state';
import { NgxsModule } from '@ngxs/store';

@NgModule({
  declarations: [UsersListComponent],
  imports: [
    CommonModule,
    UsersRoutingModule,
    IonicModule,
    TableWrapperModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    OpsFormModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    
    //standalone components
    DialogComponent,
    ConfirmationModalComponent,

    NgxsModule.forFeature([UsersState]),
  ]
})
export class UsersModule { }
