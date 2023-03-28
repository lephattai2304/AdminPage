import { Reservation } from './../../../../model/reservation';
import { ActivatedRoute, Router } from '@angular/router';
import { ReservationService } from './../../services/reservation.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-passenger-detail',
  templateUrl: './passenger-detail.component.html',
  styleUrls: ['./passenger-detail.component.css']
})
export class PassengerDetailComponent implements OnInit{
  public flightData:any;
  reservation:Reservation = new Reservation('','','','','','','','','')
  constructor(private service:ReservationService,private router:Router,private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.service.getFlight(Number.parseInt(this.route.snapshot.params['id'])).subscribe((res:any)=>{
      
      this.flightData = res;
      
    })
  }
  
  public onSubmit(){
    this.reservation.flightId = this.flightData.id;
    console.log(this.reservation);
    this.service.saveReservation(this.reservation).subscribe((res:any)=>{
      console.log('ket qua',res);
      this.router.navigate(['/confirm',res.id])
    })
  }

}
