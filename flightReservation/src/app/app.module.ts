import { ReservationService } from './services/reservation.service';
import { LoginService } from './services/login.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FindFlightComponent } from './components/find-flight/find-flight.component';
import { DisplayFlightComponent } from './components/display-flight/display-flight.component';
import { PassengerDetailComponent } from './components/passenger-detail/passenger-detail.component';
import { ConfirmComponent } from './components/confirm/confirm.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    FindFlightComponent,
    DisplayFlightComponent,
    PassengerDetailComponent,
    ConfirmComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    LoginService,
    ReservationService
  ],
  bootstrap: [FindFlightComponent]
})
export class AppModule { }
