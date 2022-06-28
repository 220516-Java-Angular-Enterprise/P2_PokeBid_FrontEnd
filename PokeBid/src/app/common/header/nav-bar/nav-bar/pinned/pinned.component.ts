import { ICard } from './../../../../../models/pokemon/pokemon';
import { PokemonService } from 'src/app/services/pokemon.service';
import { Pinned } from '../../../../../models/pinned';
import { Component, OnInit } from '@angular/core';
import { CardListing } from 'src/app/models/cardListing';
import { Condition } from 'src/app/models/condition';
import { listingspoof } from 'src/app/models/listingspoof';
import { Status } from 'src/app/models/status';
import { User } from '@auth0/auth0-angular';
import {HttpClient, HttpHeaders } from '@angular/common/http';
import { PinnedService } from 'src/app/services/pinned.service';

@Component({
  selector: 'app-pinned',
  templateUrl: './pinned.component.html',
  styleUrls: ['./pinned.component.css']
})
export class PinnedComponent implements OnInit {

  constructor(private pinnedService: PinnedService, private http:HttpClient, private pokemon: PokemonService) { }

  
  fullPinCards: Pinned[] = [];


  ngOnInit(): void {

    this.pinnedService.getPinned().subscribe( (cardlisting) => {this.fullPinCards = cardlisting
    this.fullPinCards.forEach(pinned => {
      this.pokemon.getCardById(pinned.cardListing.card_id).subscribe((json) => {
        pinned.cardListing.card_name = json.data[0].name
      })
    })
    });
  }

}


