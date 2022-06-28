import { ICard } from './../../../models/pokemon/pokemon';
import { Component, OnInit } from '@angular/core';
import { CardListing } from 'src/app/models/cardListing';
import { CardListingService } from 'src/app/services/card-listing.service';
import { PokemonService } from 'src/app/services/pokemon.service';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';

@Component({
  selector: 'app-description',
  templateUrl: './description.component.html',
  styleUrls: ['./description.component.css']
})
export class DescriptionComponent implements OnInit {

  username: string = "Anon";
  randInt: number = Math.floor(Math.random() * (100 + 1));
  greetings: string[] = [];

  constructor(private listingService: CardListingService, private pokemon: PokemonService) { }

  disabled = true;
  newmessage: string | undefined;
  private stompClient = require('stompjs');

  currentListing: CardListing = {
    card_id: '',
    condition:{
      condition_id: '',
      condition: '',
    },
    auction_bid: 0,
    auction_bidder:{
      id: '',
      username: '',
      password: '',
      address: '',
    }
  }

currentPokemon: ICard[] = [];


async ngOnInit() {
  await this.listingService.getCardListingById('5ebecd0c-2f8d-40da-88f2-27cabc11868d').toPromise().then((data: any) =>{
  this.currentListing = data;
  console.log(this.currentListing);
  this.connect();
})
await this.pokemon.getCardById(this.currentListing.card_id).toPromise().then((data:any) =>{
  this.currentPokemon = data.data
})
}

setConnected(connected: boolean) {
  this.disabled = !connected;
  if (connected) {
    this.greetings = [];
  }
}

connect() {
  const socket = new SockJS('http://localhost:8080/pokebid/testchat');
  this.stompClient = Stomp.over(socket);
  const _this = this;
  this.stompClient.connect({}, function (auction_id: "5ebecd0c-2f8d-40da-88f2-27cabc11868d", frame: string) {
    console.log('Connected: ' + frame);
    _this.stompClient.subscribe('/start/initial', function(hello: { auction_id: "5ebecd0c-2f8d-40da-88f2-27cabc11868d", body: string; }){
      console.log(JSON.parse(hello.body));
      _this.showMessage(JSON.parse(hello.auction_id), JSON.parse(hello.body));
    });
 });
}

sendMessage() {
  this.stompClient.send(
    '/current/resume',
    {},
    JSON.stringify(this.username + this.randInt + ": " + this.newmessage)
  );
  this.newmessage = "";
}

showMessage(auction_id: string, message: string) {
  if (auction_id == this.currentListing.id) {
    this.greetings.push(message); }
  //this.greetings.push({auction_id: "c899812c-0990-48c7-807d-32fa05c55310",username: this.username + this.randInt, message });
}


}
