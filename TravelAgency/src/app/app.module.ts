import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgxsRouterPluginModule } from '@ngxs/router-plugin';
import { NgxsModule } from '@ngxs/store';
import { NgxsResetPluginModule } from 'ngxs-reset-plugin';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
import { environment } from 'src/environments/environment';
import { CoreModule } from './core/core.module';
import { CurrentUserState } from './shared/state/current-user/current-user.state';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { DestinationState } from './modules/+destinations/state/destinations.state';
import { FlightState } from './modules/+flights/state/flights.state';
import { HotelState } from './modules/+hotels/state/hotel.state';
import { VacationsState } from './modules/+vacations/state/vacations.state';
import { AuthState } from './modules/+auth/state/auth.state';
import { ReservationsState } from './modules/+user-reservations/state/user-reservations.state';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    FormsModule,
    BrowserAnimationsModule,
    IonicModule.forRoot(),
    NgxsRouterPluginModule.forRoot(),
    NgxsResetPluginModule.forRoot(),
    NgxsLoggerPluginModule.forRoot({ disabled: environment.production }),

    NgxsModule.forRoot([
      DestinationState,
      FlightState,
      HotelState,
      VacationsState,
      CurrentUserState,
      AuthState,
      ReservationsState
    ]),
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
