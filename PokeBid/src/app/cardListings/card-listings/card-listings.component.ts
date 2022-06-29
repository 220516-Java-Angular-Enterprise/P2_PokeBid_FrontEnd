import { ConfirmUserComponent } from './../../user/confirm-user/confirm-user.component';
import { PokemonService } from 'src/app/services/pokemon.service';
import { ICard } from './../../models/pokemon/pokemon';
import { CardListingService } from './../../services/card-listing.service';
import { CardListing } from './../../models/cardListing';
import { Router } from '@angular/router';
import { CreateListingComponent } from './createListing/create-listing/create-listing.component';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-card-listings',
  templateUrl: './card-listings.component.html',
  styleUrls: ['./card-listings.component.css']
})
export class CardListingsComponent implements OnInit {

  constructor(private dialog: MatDialog, private service: CardListingService, private pokemon: PokemonService, private router: Router, private auth: AuthService) { }


  // Dialog
  openCreateListingDialog(){
    if(this.isLoggedIn){
    let dialogRef = this.dialog.open(CreateListingComponent, {data: {
    }})
    } else this.openConfirmUser();

  }
  
  openConfirmUser(){
    let dialogRef = this.dialog.open(ConfirmUserComponent)
  }
  

  cardListings: CardListing[] = [];
  filteredListings: CardListing[] = [];
  pokemonRendered: ICard[] = [];  
  img: string = "";
  searchName: string = '';
  isLoggedIn: boolean = false;

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
  await this.auth.isAuthenticated$.subscribe(data=>{
    this.isLoggedIn = data;
  })
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
    if(this.isLoggedIn){
    this.router.navigateByUrl(`make-sale/${id}`)
    console.log(id);
    } else {
      this.openConfirmUser();
    }

  }

  

}
