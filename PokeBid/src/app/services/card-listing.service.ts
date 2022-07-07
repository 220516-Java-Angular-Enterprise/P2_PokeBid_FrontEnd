import { ListingStatusRequest } from './../models/dtos/listingStatusRequest';
import { BidRequest } from './../models/dtos/bidRequerst';
import { CardListingRequest } from '../models/dtos/cardListingRequest';
import { CardListing } from './../models/cardListing';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CardListingService {

  constructor(private http:HttpClient) { }

  private cardListingURL  = "http://pokebidbackend-env.eba-dbmd43p6.us-east-2.elasticbeanstalk.com/pokebid/cardListing";
  

  
  getAllCardListings(): Observable<any>{
    //Active Status 
    return this.http.get(this.cardListingURL + '/' + 'updateStatusTime');
  }

  postCardListing(listing: CardListingRequest){
    return firstValueFrom(this.http.post<any>(this.cardListingURL, listing))
  }

  getCardListingById(id: string): Observable<any>{
    return this.http.get(this.cardListingURL + '/' + id);
  }

  updateHighestBidder(request: BidRequest){
    return firstValueFrom(this.http.put<any>(this.cardListingURL +"/updateBidder", request))
  }

  updateStatus(request: ListingStatusRequest){
    return firstValueFrom(this.http.put<any>(this.cardListingURL +"/updateStatus", request))
  }
}