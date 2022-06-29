import { PokemonService } from 'src/app/services/pokemon.service';
import { Pinned } from '../../../../../models/pinned';
import { Component, OnInit } from '@angular/core';
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

  // await this.pinnedService.getPinnedByUserId(this.user.id).toPromise().then((data:any) => {
  //   console.log(this.user.id)
  //   this.fullPinCards = data;
  //   console.log(this.fullPinCards)
  //   this.fullPinCards.forEach(pinned => {
  //     this.pokemon.getCardById(pinned.cardListing.card_id).subscribe((json) => {
  //       pinned.cardListing.card_name = json.data[0].name
  //     })
  //   })
  // });



}

}


