import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { LoginPageRoutingModule } from './login-routing.module';
import { LoginPage } from './components/login/login.page';
import { OpsFormModule } from 'src/app/shared/modules/form/form.module';

@NgModule({
  imports: [
    CommonModule,
    LoginPageRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    OpsFormModule,

    // Ionic
    IonicModule
  ],
  declarations: [LoginPage],
  exports: [FormsModule, ReactiveFormsModule]
})
export class LoginPageModule {}
