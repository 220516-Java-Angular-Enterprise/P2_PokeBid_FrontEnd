import { CardListing } from './../models/cardListing';
import { Injectable } from '@angular/core';
import {HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CardListingService {

  constructor(private http:HttpClient) { }

  private cardListingURL  = "http://pokebidv2-env.eba-6cei577i.us-east-2.elasticbeanstalk.com/pokebid/cardListing";
  
  getAllCardListings(): Observable<any>{
    return this.http.get(this.cardListingURL);
  }
}
