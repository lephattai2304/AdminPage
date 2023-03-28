import { ReservationService } from './../../services/reservation.service';
import { LoginService } from './../../services/login.service';
import { Criteria } from './../../../../model/criteria';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-find-flight',
  templateUrl: './find-flight.component.html',
  styleUrls: ['./find-flight.component.css']
})
export class FindFlightComponent implements OnInit{
  
  criteria : Criteria = new Criteria('','','');


  constructor(private loginService:LoginService, private service:ReservationService, private router: Router) {}

  ngOnInit(): void {
    this.loginService.login();
  }
 
  public onSubmit(){
    this.service.getFlights(this.criteria).subscribe((res:any)=>{
      this.service.flightData = res;
      // console.log(this.service.flightData);
      this.router.navigate(['/displayFlight']);
    })
  }
}
