import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  constructor(private http:HttpClient) { }
  
  data: any;
  rootURL:string  = "api.pokemontcg.io/v2/cards";
  // query example: api.pokemontcg.io/v2/cards?q=name:pikachu&rarity:common"
  


  getCards(){
    this.http.get(this.rootURL)
  }
}
