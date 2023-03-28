import { ConfirmComponent } from './components/confirm/confirm.component';
import { PassengerDetailComponent } from './components/passenger-detail/passenger-detail.component';
import { DisplayFlightComponent } from './components/display-flight/display-flight.component';
import { FindFlightComponent } from './components/find-flight/find-flight.component';
import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [

  {path:'', redirectTo:'', pathMatch:'full'},
  {
    path:'findFlight',
    component: FindFlightComponent
  },

  {
    path:'displayFlight',
    component: DisplayFlightComponent
  },

  {
    // path:'passengerDetail',
    path:'passengerDetail/:id',
    component: PassengerDetailComponent
  },

  {
    path:'confirm/:id',
    component: ConfirmComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
