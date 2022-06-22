import { Pinned } from './../models/pinned';
import { Injectable } from '@angular/core';
import {HttpClient } from '@angular/common/http';
import {firstValueFrom} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PinnedService {

  constructor(private http:HttpClient) { }

  pinnedURL  = "http://localhost:8080/pokebid/review";
  
  getPinned(): Promise<Pinned[]>{
    return firstValueFrom(this.http.get<Pinned[]>(this.pinnedURL));
  }
}
