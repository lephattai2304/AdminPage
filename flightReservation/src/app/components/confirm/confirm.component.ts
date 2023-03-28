import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.css']
})
export class ConfirmComponent implements OnInit{
  
  reservationId: any;

  constructor(private acRoute : ActivatedRoute){}

  ngOnInit(): void {
    this.reservationId = Number.parseInt(this.acRoute.snapshot.params['id']);
  }

}
