import { Component, OnInit } from '@angular/core';
import { CardListing } from 'src/app/models/cardListing';
import { Condition } from 'src/app/models/condition';
import { listingspoof } from 'src/app/models/listingspoof';
import { Status } from 'src/app/models/status';
import { User } from 'src/app/models/users';

@Component({
  selector: 'app-pinned',
  templateUrl: './pinned.component.html',
  styleUrls: ['./pinned.component.css']
})
export class PinnedComponent implements OnInit {

  constructor() { }

  pinnedCards: listingspoof[] = [];

  ngOnInit(): void {



    var firstArg: string = "first";
    var secondArg: string = "sec";
    var pokemanns: string = "pikachu";
    var descmann: string = "no tears";


    var foo: listingspoof = {
        id: firstArg,
        card: pokemanns,
        auction_bid: 10,
        card_description: descmann
    }
    this.pinnedCards.push(foo);
  }

}



