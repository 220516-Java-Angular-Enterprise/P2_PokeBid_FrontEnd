import { CardListing } from 'src/app/models/cardListing';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CardListingService } from 'src/app/services/card-listing.service';

@Component({
  selector: 'app-make-sale',
  templateUrl: './make-sale.component.html',
  styleUrls: ['./make-sale.component.css']
})
export class MakeSaleComponent implements OnInit {

  constructor(private currRouter: ActivatedRoute, private listingService: CardListingService) { }

  id: string  = '';
  listing: CardListing = {
    auction_bidder: {
      username: '',
      id: '',
      password: '',
      address: '',
    },
    card_id: '',
    condition: {
      condition: '',
      condition_id: '',
    },
    pinned: false
  }

  ngOnInit(): void {
    this.currRouter.params.subscribe(p => {
      this.id = p['id'];
      this.listingService.getCardListingById(this.id).toPromise().then((data: any) =>{
        this.listing = data;
      })
    })
  }

}
