import { BidRequest } from './../../../models/dtos/bidRequerst';
import { User } from './../../../models/users';
import { CardListing } from './../../../models/cardListing';
import { Component, OnInit } from '@angular/core';
import { CardListingService } from 'src/app/services/card-listing.service';

@Component({
  selector: 'app-live-auction',
  templateUrl: './live-auction.component.html',
  styleUrls: ['./live-auction.component.css']
})
export class LiveAuctionComponent implements OnInit {

  constructor(private listingService: CardListingService) { }

  currentListing: CardListing = {
    card_id: '',
    condition:{
      condition_id: '',
      condition: '',
    },
    auction_bid: 0,
    auction_bidder:{
      id: '',
      username: '',
      password: '',
      address: '',
    }
  }
  currentBid: any = undefined;

  


  async ngOnInit() {
    await this.listingService.getCardListingById('c899812c-0990-48c7-807d-32fa05c55310').toPromise().then((data: any) =>{
      this.currentListing = data;
      console.log(this.currentListing);
    })

  }

  changeBidPrice(target: any){
    this.currentBid = this.currentListing.auction_bid;
    this.currentBid += parseInt(target.value);
    console.log(this.currentBid)
  }

  changeCustomBidPrice(event:any){
    this.currentBid = this.currentListing.auction_bid;
    this.currentBid = parseInt(event?.target.value);
  }

  submitBid(target: any){
    let originalBid: any = this.currentListing.auction_bid;

    if(this.currentBid <= originalBid){
      alert("Current bid is lower than asking price!");
      return;
    } else {
      this.currentListing.auction_bid = this.currentBid;
      if(confirm("Are you sure you want to place a new bid for $"+ this.currentBid+"?")){
        let bidReq: BidRequest = {
          id: this.currentListing.id,
          bidder_id: "5752c9fd-fac2-4313-8407-92076b6e6b69",
          bid: this.currentListing.auction_bid,
        }
        this.listingService.updateHighestBidder(bidReq)
        return;
      }
    }

  }

  


}
