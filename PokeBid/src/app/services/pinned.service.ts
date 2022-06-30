import { PinRequest } from './../models/dtos/pinRequest';
import { Pinned } from './../models/pinned';
import { Component, Injectable } from '@angular/core';
import {HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, firstValueFrom } from 'rxjs';
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

  apiUrl  = 'http://pokebidv2-env.eba-6cei577i.us-east-2.elasticbeanstalk.com/pokebid/pinned/';

  
  
  getPinnedByUserId(id: string): Observable<any>{
    return this.http.get(this.apiUrl + 'pinnedCards/' + id);
  }

  deletePinned(id: string){
    return this.http.delete(this.apiUrl + 'delete/' + id).subscribe((data:any)=> { id = data; console.log(id); });;
  }

  postPin(request: PinRequest){
    return firstValueFrom(this.http.post<any>(this.apiUrl, request));
  }
}
