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

  
  
  getPinned(id: string): Observable<any[]>{
    return this.http.get<any[]>(this.apiUrl + id);
  }
}
