import { ICard } from './../../../../../models/pokemon/pokemon';
import { PokemonService } from 'src/app/services/pokemon.service';
import { Pinned } from '../../../../../models/pinned';
import { Component, OnInit } from '@angular/core';
import { CardListing } from 'src/app/models/cardListing';
import { Condition } from 'src/app/models/condition';
import { listingspoof } from 'src/app/models/listingspoof';
import { Status } from 'src/app/models/status';
import {HttpClient, HttpHeaders } from '@angular/common/http';
import { PinnedService } from 'src/app/services/pinned.service';
import { AuthService } from '@auth0/auth0-angular';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/users';

@Component({
  selector: 'app-pinned',
  templateUrl: './pinned.component.html',
  styleUrls: ['./pinned.component.css']
})
export class PinnedComponent implements OnInit {

  constructor(private pinnedService: PinnedService, private http:HttpClient, private pokemon: PokemonService, private auth: AuthService, private userService: UserService) { }

  
fullPinCards: Pinned[] = [];
  isLoggedIn = false;
user: User = {
  id: '',
  username: '',
  password: '',
  address: '',
};
email?: string = '';


  async ngOnInit() {

  await this.auth.isAuthenticated$.subscribe(data =>{
    this.isLoggedIn = data;
  })
  
  if(this.isLoggedIn){
  await this.auth.user$.subscribe(u=>{
      this.email = u?.email;
      this.userService.getUsersByEmail(this.email).toPromise().then((data:any)=>{
        this.user = data;
        console.log(this.user);
    })
    })
  }

    this.pinnedService.getPinned(this.user.id).subscribe((pinnedList) => {this.fullPinCards = pinnedList
    this.fullPinCards.forEach(pinned => {
      this.pokemon.getCardById(pinned.cardListing.card_id).subscribe((json) => {
        pinned.cardListing.card_name = json.data[0].name
      })
    })
    });



}

}


