import { CardListing } from './../models/cardListing';
import { Injectable } from '@angular/core';
import {HttpClient } from '@angular/common/http';
import {firstValueFrom} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CardListingService {

  constructor(private http:HttpClient) { }

  cardListingURL  = "http://localhost:8080/pokebid/";
  
  getAllCardListings(): Promise<CardListing[]>{
    return firstValueFrom(this.http.get<CardListing[]>(this.cardListingURL));
  }
}
