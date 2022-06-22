import { Status } from './../models/status';
import { Injectable } from '@angular/core';
import {HttpClient } from '@angular/common/http';
import {firstValueFrom} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StatusService {

  constructor(private http:HttpClient) { }

  statusURL = "http://localhost:8080/pokebid/status";
  
  getAllStatus(): Promise<Status[]>{
    return firstValueFrom(this.http.get<Status[]>(this.statusURL));
  }
}
