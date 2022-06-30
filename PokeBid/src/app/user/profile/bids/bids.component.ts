import { ICard } from './../../../models/pokemon/pokemon';
import { Component, OnInit } from '@angular/core';
import { HistoryService } from 'src/app/services/history.service';
import { History } from 'src/app/models/history';
import { PokemonService } from 'src/app/services/pokemon.service';
import { User } from 'src/app/models/user';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-bids',
  templateUrl: './bids.component.html',
  styleUrls: ['./bids.component.css']
})
export class BidsComponent implements OnInit {

  constructor(private historyService: HistoryService, private pokemonService: PokemonService, public currRoute: ActivatedRoute, public userService: UserService, public auth: AuthService) { }

  history: History[] = []
  card: ICard[] = []
  user: User = {id: "", username: "", password: "", address: "", role: "", email: ""}
  email?: string = '';
  isLoggedIn: boolean = false;


  async ngOnInit() {
      this.auth.isAuthenticated$.subscribe(log=>{
      this.isLoggedIn = log;
      if(this.isLoggedIn){
      this.auth.user$.subscribe(u=>{
      this.email = u?.email;
      this.userService.getUsersByEmail(this.email).subscribe((data:any)=>{
      this.user = data;
      this.historyService.getHistoryByUserId(this.user.id).toPromise().then((hist:any) => {
      this.history = hist;
      this.history.forEach(element => {
      this.pokemonService.getCardById(element.listing?.card_id).toPromise().then((data: any) => {
        this.card = data.data
        element.imageURL = this.card[0].images.small
        element.pokeName = this.card[0].name
      });
    }); 
    })
    })
    })
        }
      })

}



}
