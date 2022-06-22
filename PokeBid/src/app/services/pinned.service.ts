import { Pinned } from './../models/pinned';
import { Component, Injectable } from '@angular/core';
import {HttpClient } from '@angular/common/http';
import {firstValueFrom} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
@Component(
  {
    selector: 'app-navbar',
    template: `
    <p> {{myString}} </p>
    `
  }
)
export class PinnedService {

  constructor(private http:HttpClient) { }

  pinnedURL  = "http://localhost:8080/pokebid/review";

  myString = 'IFoundIt';
  
  getPinned(): Promise<Pinned[]>{
    return firstValueFrom(this.http.get<Pinned[]>(this.pinnedURL));
  }
}
