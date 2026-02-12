import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserTabsComponent } from './components/user-tabs/user-tabs.component';
import { UserTabsRoutingModule } from './user-tabs-routing.module';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@NgModule({
  declarations: [UserTabsComponent],
  imports: [CommonModule, UserTabsRoutingModule, IonicModule, FormsModule],
})
export class UserTabsModule {}
