import { ListingStatusRequest } from './../../../models/dtos/listingStatusRequest';
import { NotificationRequest } from './../../../models/dtos/notificationRequest';
import { BidRequest } from './../../../models/dtos/bidRequerst';
import { CardListing } from './../../../models/cardListing';
import { Component, OnInit } from '@angular/core';
import { CardListingService } from 'src/app/services/card-listing.service';
import { ActivatedRoute } from '@angular/router';
import { NotificationsService } from 'src/app/services/notifications.service';
import { User } from 'src/app/models/users';
import { AuthService } from '@auth0/auth0-angular';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-live-auction',
  templateUrl: './live-auction.component.html',
  styleUrls: ['./live-auction.component.css']
})
export class LiveAuctionComponent implements OnInit {

  constructor(private listingService: CardListingService,private notificationService: NotificationsService, public currRoute: ActivatedRoute, public auth: AuthService, public userService: UserService, private router: Router) { }

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
isLoggedIn = false;
user: User = {
  id: '',
  username: '',
  password: '',
  address: '',
};
email?: string = '';
  


  async ngOnInit() {
    this.currRoute.params.subscribe(p => {
      this.id = p['id'];
    })
    await this.listingService.getCardListingById(this.id).toPromise().then((data: any) =>{
      this.currentListing = data;
    })
    this.auth.user$.subscribe((u:any)=>{
    this.email = u.email;
    this.userService.getUsersByEmail(this.email).subscribe(data=>{ 
      this.user = data;
    })
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
    if(this.currentListing.user?.id === this.user.id){
      alert("You cannot bid on your own auction!!");
      return;
    }
    if(this.currentBid <= originalBid){
      alert("Current bid is lower than asking price!");
      return;
    } else {
      this.currentListing.auction_bid = this.currentBid;
      if(confirm("Are you sure you want to place a new bid for $"+ this.currentBid+"?")){
        let bidReq: BidRequest = {
          id: this.currentListing.id,
          bidder_id: this.user.id,
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
          user_id: this.user.id,
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

  buyNow(){
  if(this.currentListing.user?.id === this.user.id){
    alert("You cannot buy on your own auction!!");
    return;
  } else {
    if(confirm("Are you sure you want to buy this item for $"+ this.currentListing.buy_out_price+"?")){
    this.currentListing.auction_bid = this.currentListing.buy_out_price;
    let bidReq: BidRequest = {
      id: this.currentListing.id,
      bidder_id: this.user.id,
      bid: this.currentListing.buy_out_price
    }
    let listStatusReq: ListingStatusRequest ={
      id: this.currentListing.id,
      status_id: "1c8439b2-85a6-4ab5-b77e-b8a2bf2998ff"
    }
    let notification1: NotificationRequest = {
      user_id: this.currentListing.auction_bidder.id,
      auction_id: this.currentListing.id,
      message: "Someone has bought the card you bidded on this auction."
    } 
    let notification2: NotificationRequest = {
      user_id: this.currentListing.user?.id,
      auction_id: this.currentListing.id,
      message: "Someone has bought out your card auction."
    }
    let notification3: NotificationRequest = {
      user_id: this.user.id,
      auction_id: this.currentListing.id,
      message: "You have bought this card auction."
    }
    this.notificationService.postNotification(notification1)
    this.notificationService.postNotification(notification2)
    this.notificationService.postNotification(notification3)
    this.listingService.updateHighestBidder(bidReq)
    this.listingService.updateStatus(listStatusReq)
    alert("Successfully Purchased!")
    this.router.navigateByUrl('');
    return;
  }
  }

  }

  


}
