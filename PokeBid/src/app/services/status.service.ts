import { Status } from './../models/status';
import { Injectable } from '@angular/core';
import {HttpClient } from '@angular/common/http';
import {firstValueFrom} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StatusService {

  constructor(private http:HttpClient) { }

  statusURL = "http://pokebidbackend-env.eba-dbmd43p6.us-east-2.elasticbeanstalk.com/pokebid/status";
  
  getAllStatus(): Promise<Status[]>{
    return firstValueFrom(this.http.get<Status[]>(this.statusURL));
  }

}
