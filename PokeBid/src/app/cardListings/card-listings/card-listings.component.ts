import { PinRequest } from './../../models/dtos/pinRequest';
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
import { Pinned } from 'src/app/models/pinned';
import { PinnedService } from 'src/app/services/pinned.service';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-card-listings',
  templateUrl: './card-listings.component.html',
  styleUrls: ['./card-listings.component.css']
})
export class CardListingsComponent implements OnInit {

  constructor(private dialog: MatDialog, private service: CardListingService, private pokemon: PokemonService, private router: Router, private auth: AuthService, public userService: UserService, public pinnedService: PinnedService) { }


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
  pinned: Pinned[] = [];
  filteredListings: CardListing[] = [];
  pokemonRendered: ICard[] = [];  
  img: string = "";
  searchName: string = '';
  isLoggedIn: boolean = false;
  user: User = {
  id: '',
  username: '',
  password: '',
  address: '',
};
  email?: string = '';

  async ngOnInit(){
    //Sets log in
    this.auth.isAuthenticated$.subscribe(data=>{
    this.isLoggedIn = data;
    if(this.isLoggedIn){
      //Gets user from backend via email.
      this.auth.user$.subscribe(u=>{
      this.email = u?.email;
      this.userService.getUsersByEmail(this.email).toPromise().then((data:any)=>{
        this.user = data;
    })
    })
    }
  })
  this.service.getAllCardListings().subscribe((data:any) =>{
    //Gets and sets card listings on it.
    this.cardListings = data;
    //Gets pinned for users. 
    this.pinnedService.getPinnedByUserId(this.user.id).subscribe((pin:any)=> {
      this.pinned = pin; 
      //Checks if item is pinned by user. 
      this.cardListings.forEach(listing=>{
        this.pinned.forEach(pin => {
          if(listing.id === pin.cardListing.id){
          //Sets pinned status true in card listing.
            listing.pinned = true;
          }
        })
      })
    })
    this.cardListings.forEach(listing => {
      //Gets and sets pokemon image and name from Pokemon API
      this.pokemon.getCardById(listing.card_id).subscribe(data => {
        listing.imgUrl = data.data[0].images.small
        listing.card_name = data.data[0].name
      })
    })
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

  refreshListing(){
  this.service.getAllCardListings().toPromise().then((data:any) =>{
  this.cardListings = data;
  this.cardListings.forEach(listing => {
    this.pokemon.getCardById(listing.card_id).subscribe(data => {
      listing.imgUrl = data.data[0].images.small
      listing.card_name = data.data[0].name
      })
    })
  })
  }

  addPin(listing_id: string){
    let pinReq: PinRequest ={
      listing_id: listing_id,
      user_id: this.user.id
    }
    this.pinnedService.postPin(pinReq);
    console.log("Pinned!")
  }

}
