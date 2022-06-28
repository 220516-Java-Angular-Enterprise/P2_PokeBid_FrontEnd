import { BidRequest } from './../../../models/dtos/bidRequerst';
import { CardListing } from './../../../models/cardListing';
import { Component, OnInit } from '@angular/core';
import { CardListingService } from 'src/app/services/card-listing.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-live-auction',
  templateUrl: './live-auction.component.html',
  styleUrls: ['./live-auction.component.css']
})
export class LiveAuctionComponent implements OnInit {

  constructor(private listingService: CardListingService, public currRoute: ActivatedRoute) { }

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
  id: string = '';

  


  async ngOnInit() {
    this.currRoute.params.subscribe(p => {
      this.id = p['id'];
    })
    await this.listingService.getCardListingById(this.id).toPromise().then((data: any) =>{
      this.currentListing = data;
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
