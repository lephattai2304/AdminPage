import { Router } from '@angular/router';
import { ReservationService } from './../../services/reservation.service';
import { Component ,OnInit} from '@angular/core';

@Component({
  selector: 'app-display-flight',
  templateUrl: './display-flight.component.html',
  styleUrls: ['./display-flight.component.css']
})
export class DisplayFlightComponent implements OnInit{

  data : any;

  constructor(private service : ReservationService, private route : Router){}

  ngOnInit():void {
    this.data = this.service.flightData;
    

  }

  public onSelect(id:Number): any {
    this.route.navigate(['/passengerDetail/'+id]);
    // this.route.navigate(['/passengerDetail']);
  }
}
