import { Component, OnInit } from '@angular/core';
import { CardListing } from 'src/app/models/cardListing';
import { Condition } from 'src/app/models/condition';
import { listingspoof } from 'src/app/models/listingspoof';
import { Status } from 'src/app/models/status';
import { User } from 'src/app/models/users';
import {HttpClient, HttpHeaders } from '@angular/common/http';
import { PinnedService } from 'src/app/services/pinned.service';

@Component({
  selector: 'app-pinned',
  templateUrl: './pinned.component.html',
  styleUrls: ['./pinned.component.css']
})
export class PinnedComponent implements OnInit {

  constructor(private pinnedService: PinnedService, private http:HttpClient) { }

  
  fullPinCards: any[] = [];

  ngOnInit(): void {

    this.pinnedService.getPinned().subscribe( (cardlisting) => this.fullPinCards = cardlisting );
  }

}



