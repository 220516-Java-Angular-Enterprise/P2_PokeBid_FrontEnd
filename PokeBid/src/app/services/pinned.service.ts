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

  apiUrl  = 'http://pokebidv2-env.eba-6cei577i.us-east-2.elasticbeanstalk.com/pokebid/pinned/pinnedCards/'; //Add user ID

  
  
  getPinnedByUserId(id: string): Observable<Pinned>{
    return this.http.get<Pinned>(this.apiUrl + id);
  }
}
