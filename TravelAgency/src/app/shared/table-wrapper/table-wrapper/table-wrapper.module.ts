import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableWrapperComponent } from './table-wrapper.component';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDialogModule } from '@angular/material/dialog';
import { CapitalizeFirstPipe } from '../../pipes/capitalize-first.pipe';
import { TableToolbarComponent } from '../../table-toolbar/table-toolbar.component';
import { IonicModule } from '@ionic/angular';
import { StarArrayPipe } from '../../pipes/star-array.pipe';

@NgModule({
  declarations: [TableWrapperComponent, TableToolbarComponent],
  imports: [
    CommonModule,
    IonicModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    MatSortModule,
    MatPaginatorModule,
    MatDialogModule,
    MatSortModule,

    //pipes
    CapitalizeFirstPipe,
    StarArrayPipe
  ],
  exports: [
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    MatSortModule,
    MatPaginatorModule,
    MatDialogModule,

    TableWrapperComponent,
    TableToolbarComponent
  ],
})
export class TableWrapperModule {}
