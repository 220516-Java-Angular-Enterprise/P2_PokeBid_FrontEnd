import { Pinned } from './../models/pinned';
import { Component, Injectable } from '@angular/core';
import {HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable} from 'rxjs';
import { CardListing } from '../models/cardListing';


@Injectable({
  providedIn: 'root'
})
@Component(
  {
    selector: 'app-navbar',
    template: `
    <p></p>
    `
  }
)
export class PinnedService {

  constructor(private http:HttpClient) { }

  apiUrl  = 'http://localhost:8080/pokebid/pinned/pinnedCards/ec40ae5b-12ed-4fb1-8051-199bb2d6533f'; //Add user ID

  
  
  getPinned(): Observable<any[]>{
    return this.http.get<any[]>(this.apiUrl);
  }
}
