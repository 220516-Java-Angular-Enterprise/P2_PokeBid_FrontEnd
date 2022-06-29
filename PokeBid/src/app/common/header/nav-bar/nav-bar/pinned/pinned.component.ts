import { PokemonService } from 'src/app/services/pokemon.service';
import { Pinned } from '../../../../../models/pinned';
import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpHeaders } from '@angular/common/http';
import { PinnedService } from 'src/app/services/pinned.service';
import { AuthService } from '@auth0/auth0-angular';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pinned',
  templateUrl: './pinned.component.html',
  styleUrls: ['./pinned.component.css']
})
export class PinnedComponent implements OnInit {

  constructor(private pinnedService: PinnedService, private http:HttpClient, private pokemon: PokemonService, private auth: AuthService, private userService: UserService, private router: Router) { }

  
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
            this.fullPinCards.forEach(pinned => {
              this.pokemon.getCardById(pinned.cardListing.card_id).subscribe(data=> {
              pinned.cardListing.card_name = data.data[0].name
        })
      })
    })
    })
  })

}

getPinned() {
  this.pinnedService.getPinnedByUserId(this.user.id).toPromise().then((data:any) => {
    this.fullPinCards = data;
    console.log(this.fullPinCards)
    this.fullPinCards.forEach(notification => {
      this.pokemon.getCardById(notification.cardListing.card_id).subscribe(data=> {
        notification.cardListing.card_name = data.data[0].name
        console.log(notification);
      })
    })
  })
}

goToListing(id: any){
  this.router.navigateByUrl(`make-sale/${id}`)
}

deletePinned(id: string){
  this.pinnedService.deletePinned(id);
  this.getPinned();
}


}


