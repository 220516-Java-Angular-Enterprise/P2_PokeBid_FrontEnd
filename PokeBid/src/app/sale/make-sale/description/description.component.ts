import { ICard } from './../../../models/pokemon/pokemon';
import { Component, OnInit } from '@angular/core';
import { CardListing } from 'src/app/models/cardListing';
import { CardListingService } from 'src/app/services/card-listing.service';
import { PokemonService } from 'src/app/services/pokemon.service';

@Component({
  selector: 'app-description',
  templateUrl: './description.component.html',
  styleUrls: ['./description.component.css']
})
export class DescriptionComponent implements OnInit {

  constructor(private listingService: CardListingService, private pokemon: PokemonService) { }

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

currentPokemon: ICard[] = [];


async ngOnInit() {
  await this.listingService.getCardListingById('5ebecd0c-2f8d-40da-88f2-27cabc11868d').toPromise().then((data: any) =>{
  this.currentListing = data;
  console.log(this.currentListing);
})
await this.pokemon.getCardById(this.currentListing.card_id).toPromise().then((data:any) =>{
  this.currentPokemon = data.data
})
}


}
