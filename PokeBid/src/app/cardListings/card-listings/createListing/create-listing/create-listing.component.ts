import { Condition } from './../../../../models/condition';
import { ConditionService } from './../../../../services/condition.service';
import { CardListingService } from './../../../../services/card-listing.service';
import { CardListingRequest } from 'src/app/models/dtos/cardListingRequest';
import { CardListing } from 'src/app/models/cardListing';
import { ICard } from './../../../../models/pokemon/pokemon';
import { PokemonService } from 'src/app/services/pokemon.service';
import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { AuthService } from '@auth0/auth0-angular';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/users';
@Component({
  selector: 'app-create-listing',
  templateUrl: './create-listing.component.html',
  styleUrls: ['./create-listing.component.css']
})


export class CreateListingComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public pokemon:PokemonService, public listingService: CardListingService, public conditionService: ConditionService, private auth: AuthService, private userService: UserService) { }

cardList: ICard[] = [];
rarities: string[] = [];
conditions: Condition[] = [];
selectedCardName: string = '';
selectedCardId: string = '';
auction_bid: number = 0;
condition_id: string = '';
card_description: string = '';
selectTime: Date = new Date();
searchName: string = '';
searchRarity: any = undefined;
buy_now: number = 0;
isLoggedIn = false;
user: User = {
  id: '',
  username: '',
  password: '',
  address: '',
};
email?: string = '';

async ngOnInit() {

  this.pokemon.getRarities()
  .subscribe(
    data=>{
      this.rarities = data.data;
    }
  )

  this.conditionService.getAllConditions().subscribe(
    data=>{
      this.conditions = data
    }
  )

  this.auth.isAuthenticated$.subscribe(data =>{
    this.isLoggedIn = data;
      if(this.isLoggedIn){
    this.auth.user$.subscribe(u=>{
      this.email = u?.email;
      this.userService.getUsersByEmail(this.email).toPromise().then((data:any)=>{
        this.user = data;
    })
    })
  }
  })



}

onKey(event: any){
  this.searchName = event.target.value;
}

onSelect(value: any): string{
  this.searchRarity = value
  console.log(value)
  return this.searchRarity;
}

searchPokemon(): ICard[] {
  this.pokemon.getCardsByNameAndRarity(this.searchName, this.searchRarity)
  .subscribe(
    data=>{
      this.cardList = data.data
    }
  )
  return this.cardList;
}

selectCard(target: any){
  this.selectedCardName = target.id
  this.selectedCardId = target.alt
}

selectCondition(value: any): string{
  this.condition_id = value;
  this.conditions.forEach(condition => {
    if(condition.condition === this.condition_id){
      this.condition_id = condition.condition_id 
    }
  })
  console.log(this.condition_id);
  return this.condition_id;
}

selectDate(value: any): Date{
  let currentTime = new Date();
  console.log(currentTime)
  if(value == "1"){
  currentTime.setDate(currentTime.getDate() + 1)
  }
  if(value == "3"){
  currentTime.setDate(currentTime.getDate() + 3)
  }
  if(value == "7"){
  currentTime.setDate(currentTime.getDate() + 7)
  }
  console.log(currentTime)
  this.selectTime = currentTime;
  return this.selectTime;
}

onKeyDesc(event: any): string{
  this.card_description = event.target.value;
  return this.card_description;
}

onKeyPrice(event: any): number{
  this.auction_bid = event.target.value;
  console.log(this.auction_bid)
  return this.auction_bid;
}

onKeyBuyNowPrice(event: any): number{
  this.buy_now = event.target.value;
  console.log(this.buy_now)
  return this.buy_now;
}

addListing(): void{
let listing: CardListingRequest = {
  lister_id: this.user.id,
  card_id: this.selectedCardId,
  auction_bid: this.auction_bid,
  status_id: '1e207de7-49d2-4963-8c0d-55095be5bda8',
  condition_id: this.condition_id,
  description: this.card_description,
  endTime: this.selectTime,
  buy_out_price: this.buy_now
};


console.log(listing);
//Call post request
this.listingService.postCardListing(listing);
}






  

}



