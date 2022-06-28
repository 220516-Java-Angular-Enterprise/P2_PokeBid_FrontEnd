import { PokemonService } from 'src/app/services/pokemon.service';
import { ICard } from './../../models/pokemon/pokemon';
import { CardListingService } from './../../services/card-listing.service';
import { CardListing } from './../../models/cardListing';
import { Router } from '@angular/router';
import { CreateListingComponent } from './createListing/create-listing/create-listing.component';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-card-listings',
  templateUrl: './card-listings.component.html',
  styleUrls: ['./card-listings.component.css']
})
export class CardListingsComponent implements OnInit {

  constructor(private dialog: MatDialog, private service: CardListingService, private pokemon: PokemonService, private router: Router) { }


  // Dialog
  openDialog(){
    let dialogRef = this.dialog.open(CreateListingComponent, {data: {
    }})

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`)
    })
  }

  cardListings: CardListing[] = [];
  filteredListings: CardListing[] = [];
  pokemonRendered: ICard[] = [];  
  img: string = "";
  searchName: string = '';

  async ngOnInit(){
  await this.service.getAllCardListings().toPromise().then((data:any) =>{
    this.cardListings = data;
    
    this.cardListings.forEach(listing => {
      this.pokemon.getCardById(listing.card_id).subscribe(data => {
        listing.imgUrl = data.data[0].images.small
        listing.card_name = data.data[0].name
      })
    })
  })
  console.log(this.cardListings)
  }
  
  onKeySearch(event: any){
    this.filteredListings = [];
    this.searchName = event.target.value.toLowerCase();
    this.cardListings.forEach(listing => {
    if(listing.card_name?.toLowerCase().includes(this.searchName) && !this.filteredListings.includes(listing)){
    this.filteredListings.push(listing);
      }
    })

  }
  

  filterSearch(){
    this.filteredListings = [];
    this.cardListings.forEach(listing => {
    if(listing.card_name?.toLowerCase().includes(this.searchName) && !this.filteredListings.includes(listing)){
    this.filteredListings.push(listing);
      }
    })
  }

  goToListing(id: any){
    this.router.navigateByUrl(`make-sale/${id}`)
    console.log(id);
  }

  

}
