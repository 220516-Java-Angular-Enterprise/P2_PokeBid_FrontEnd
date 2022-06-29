import { NotificationRequest } from './../../../models/dtos/notificationRequest';
import { BidRequest } from './../../../models/dtos/bidRequerst';
import { CardListing } from './../../../models/cardListing';
import { Component, OnInit } from '@angular/core';
import { CardListingService } from 'src/app/services/card-listing.service';
import { ActivatedRoute } from '@angular/router';
import { NotificationsService } from 'src/app/services/notifications.service';

@Component({
  selector: 'app-live-auction',
  templateUrl: './live-auction.component.html',
  styleUrls: ['./live-auction.component.css']
})
export class LiveAuctionComponent implements OnInit {

  constructor(private listingService: CardListingService,private notificationService: NotificationsService, public currRoute: ActivatedRoute) { }

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
        if (this.currentListing.auction_bidder != null) {
          let notification1: NotificationRequest = {
            user_id: this.currentListing.auction_bidder.id,
            auction_id: this.currentListing.id,
            message: "Someone has outbid you on this auction."
          } 
          this.notificationService.postNotification(notification1)
        }
        let notification2: NotificationRequest = {
          user_id: this.currentListing.user?.id,
          auction_id: this.currentListing.id,
          message: "Someone has bid on your card auction."
        }
        let notification3: NotificationRequest = {
          user_id: "5752c9fd-fac2-4313-8407-92076b6e6b69",
          auction_id: this.currentListing.id,
          message: "You have bid on this card auction."
        }
        this.notificationService.postNotification(notification2)
        this.notificationService.postNotification(notification3)
        this.listingService.updateHighestBidder(bidReq)
        return;
      }
    }

  }

  


}
