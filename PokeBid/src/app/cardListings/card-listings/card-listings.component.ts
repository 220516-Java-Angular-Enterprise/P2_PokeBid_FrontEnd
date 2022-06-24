import { PokemonService } from 'src/app/services/pokemon.service';
import { ICard } from './../../models/pokemon/pokemon';
import { CardListingService } from './../../services/card-listing.service';
import { CardListing } from './../../models/cardListing';

import { CreateListingComponent } from './createListing/create-listing/create-listing.component';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-card-listings',
  templateUrl: './card-listings.component.html',
  styleUrls: ['./card-listings.component.css']
})
export class CardListingsComponent implements OnInit {

  constructor(private dialog: MatDialog, private service: CardListingService, private pokemon: PokemonService) { }


  // Dialog
  openDialog(){
    let dialogRef = this.dialog.open(CreateListingComponent, {data: {

    }})

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`)
    })
  }

  cardListings: CardListing[] = [];
  pokemonRendered: ICard[] = [];  
  img: string = "";

  ngOnInit(): void {

    this.service.getAllCardListings().subscribe((data:any) =>{
      this.cardListings = data;
      
      this.cardListings.forEach(listing => {
        this.pokemon.getCardById(listing.card_id).subscribe(data => {
          listing.imgUrl = data.data[0].images.small
          listing.card_name = data.data[0].name
        })
      })
    })
    
    

    this.pokemon.getCardById("pl3-1").subscribe((data:any) =>{
      this.img = data.data[0].images.small;
    })


    }
  

}
