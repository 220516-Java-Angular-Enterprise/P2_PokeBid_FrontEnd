import { ICard } from './../../../../models/pokemon/pokemon';
import { PokemonService } from 'src/app/services/pokemon.service';
import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';



@Component({
  selector: 'app-create-listing',
  templateUrl: './create-listing.component.html',
  styleUrls: ['./create-listing.component.css']
})


export class CreateListingComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public pokemon:PokemonService) { }

  cardList: ICard[] = [];
  rarities: string[] = [];



  ngOnInit(): void {

    this.pokemon.getRarities()
    .subscribe(
      data=>{
        this.rarities = data.data;
      }
    )
  }

  searchName: string = '';
  searchRarity: any = undefined;

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
      console.log(this.searchRarity);
      console.log(this.searchName);
      }
    )
    return this.cardList;
  }

  


  

}



