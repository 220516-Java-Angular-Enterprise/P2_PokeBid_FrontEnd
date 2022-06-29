import { ICard } from './../../../models/pokemon/pokemon';
import { Component, OnInit } from '@angular/core';
import { HistoryService } from 'src/app/services/history.service';
import { History } from 'src/app/models/history';
import { PokemonService } from 'src/app/services/pokemon.service';

@Component({
  selector: 'app-bids',
  templateUrl: './bids.component.html',
  styleUrls: ['./bids.component.css']
})
export class BidsComponent implements OnInit {

  constructor(private historyService: HistoryService, private pokemonService: PokemonService) { }

  history: History[] = []
  card: ICard[] = []

  async ngOnInit() {
    await this.historyService.getHistoryByUserId("ec40ae5b-12ed-4fb1-8051-199bb2d6533f").toPromise().then((data:any) => {
      this.history = data
      console.log(this.history)
    })

    await this.history.forEach(element => {
      this.pokemonService.getCardById(element.listing?.card_id).toPromise().then((data: any) => {
        this.card = data.data
        console.log(this.card)

        element.imageURL = this.card[0].images.small
        element.pokeName = this.card[0].name
        console.log(this.history)
      });
    }); 
    
    
    
  }

}
