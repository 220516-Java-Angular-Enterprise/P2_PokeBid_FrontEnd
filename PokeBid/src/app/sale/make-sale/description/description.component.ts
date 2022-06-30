import { ICard } from './../../../models/pokemon/pokemon';
import { Component, OnInit, NgModule } from '@angular/core';
import { CardListing } from 'src/app/models/cardListing';
import { CardListingService } from 'src/app/services/card-listing.service';
import { PokemonService } from 'src/app/services/pokemon.service';
import { ActivatedRoute } from '@angular/router';
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

  constructor(private listingService: CardListingService, private pokemon: PokemonService, private currRoute: ActivatedRoute) { }

  disabled = true;
  newmessage: string | undefined;
  private stompClient = require('stompjs');

  id: string = '';

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
    },
    pinned: false
  }


currentPokemon: ICard[] = [];


async ngOnInit() {
  this.currRoute.params.subscribe(p => {
    this.id = p['id']
  })
  await this.listingService.getCardListingById(this.id).toPromise().then((data: any) =>{
  this.currentListing = data;
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
  const socket = new SockJS('http://pokebidv2-env.eba-6cei577i.us-east-2.elasticbeanstalk.com/pokebid/testchat/');
  this.stompClient = Stomp.over(socket);
  const _this = this;
  this.stompClient.connect({}, function (frame: string) {
    console.log('Connected: ' + frame);
    _this.stompClient.subscribe('/start/initial', function( hello: {body: string}){
      _this.showMessage(JSON.parse(hello.body));
    });
  });
}

sendMessage() {
  this.stompClient.send(
    '/current/resume',
    {},
    //this.obj
    JSON.stringify(this.id + "~" + this.username + this.randInt + ": " + this.newmessage)
  );
  this.newmessage = "";
}

showMessage(message: string) {
    var split = message.split("~");
    if (split[0] == this.id) { this.greetings.push(split[1]); } 
}

onKeydown(event: any){
  event.preventDefault();
}
}

