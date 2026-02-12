import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminTabsRoutingModule } from './admin-tabs-routing.module';
import { AdminTabsComponent } from './components/admin-tabs/admin-tabs.component';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [AdminTabsComponent],
  imports: [CommonModule, AdminTabsRoutingModule, IonicModule, FormsModule],
})
export class AdminTabsModule {}
