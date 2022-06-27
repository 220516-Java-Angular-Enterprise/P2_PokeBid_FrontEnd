import { ICard } from './../models/pokemon/pokemon';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  constructor(private http:HttpClient,) { }

  header = new HttpHeaders().set("x-api-key", "3f83c220-4b9c-46be-a82e-d0239199c5a2");
  

  rootURL:string  = "https://api.pokemontcg.io/v2/cards";
  // query example: api.pokemontcg.io/v2/cards?q=name:pikachu&rarity:common"
  

  getCards(): Observable<ICard[]>{
    return this.http.get<ICard[]>('https://api.pokemontcg.io/v2/cards');
  }

  getRarities(): Observable<any>{
    return this.http.get('https://api.pokemontcg.io/v2/rarities', {'headers': this.header})
  }

  getCardsByNameAndRarity(name: string, rarity?: string): Observable<any>{
      if(rarity === undefined){
        return this.http.get(`https://api.pokemontcg.io/v2/cards?q=name:${name}*`, {'headers': this.header})
      } 
    return this.http.get(`https://api.pokemontcg.io/v2/cards?q=name:${name}* rarity:${this.determineRarity(rarity)}`, {'headers': this.header})
  }

  getCardById(id: string): Observable<any>{
    return this.http.get(`https://api.pokemontcg.io/v2/cards?q=id:${id}`, {'headers': this.header});
  }
  
private determineRarity(rarity:string): string{
    switch(rarity){
  case "Amazing Rare":
    rarity = "amazing";
    break;
  case "Classic Collection":
    rarity = "classic";
    break;
  case "Radiant Rare":
    rarity = "radiant";
    break;
  case "Rare BREAK":
    rarity = "break";
    break;
    case "Rare Holo":
    rarity = "holo";
    break;
  case "Rare Holo EX":
    rarity = "ex";
    break;
  case "Rare Holo GX":
    rarity = "gx";
    break;
  case "Rare Holo LV.X":
    rarity = "lv";
    break;
  case "Rare Holo Star":
    rarity = "star";
    break;
    case "Rare Holo V":
    rarity = "v";
    break;
    case "Rare ACE":
    rarity = "ace";
    break;
  case "Rare Holo VMAX":
    rarity = "vmax";
    break;
  case "Rare Holo VSTAR":
    rarity = "vstar";
    break;
  case "Rare Prime":
    rarity = "prime";
    break;
    case "Rare Prime Star":
    rarity = "star";
    break;
  case "Rare Rainbow":
    rarity = "rainbow";
    break;
  case "Rare Secret":
    rarity = "secret";
    break;
  case "Rare Shining":
    rarity = "shining";
    break;
    case "Rare Shiny":
    rarity = "shiny";
    break;
  case "Rare Shiny GX":
    rarity = "gx";
    break;
  case "Rare Ulta":
    rarity = "ulta";
    break;
  default:
    break;
    }
    return rarity;
  }
}
