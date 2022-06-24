import { CardListingRequest } from '../models/cardListingRequest';
import { CardListing } from './../models/cardListing';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CardListingService {

  constructor(private http:HttpClient) { }

  private cardListingURL  = "http://pokebidv2-env.eba-6cei577i.us-east-2.elasticbeanstalk.com/pokebid/cardListing";
  

  
  getAllCardListings(): Observable<any>{
    return this.http.get(this.cardListingURL);
  }

  postCardListing(listing: CardListingRequest){
    return firstValueFrom(this.http.post<any>(this.cardListingURL, listing))

  }


// {
//       lister_id: listing.lister_id,
//       card_id: listing.card_id,
//       auction_bid: listing.auction_bid,
//       condition_id: listing.condition_id,
//       status_id: listing.status_id,
//       description: listing.description,
//       endTime: listing.endTime
// }
    }