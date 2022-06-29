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
  this.auth.user$.subscribe((u:any)=>{
    this.email = u.email;
    this.userService.getUsersByEmail(this.email).subscribe(data=>{ 
      this.user = data;
        this.pinnedService.getPinnedByUserId(this.user.id).subscribe(notifs=>{
          this.fullPinCards = notifs;
    })
    })
  })




}

}


