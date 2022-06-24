import { Condition } from './../models/condition';
import { Injectable } from '@angular/core';
import {HttpClient } from '@angular/common/http';
import {firstValueFrom} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConditionService {

  constructor(private http:HttpClient) { }

  conditionURL  = "http://pokebidv2-env.eba-6cei577i.us-east-2.elasticbeanstalk.com/pokebid/condition";
  
  getAllConditions(): Promise<Condition[]>{
    return firstValueFrom(this.http.get<Condition[]>(this.conditionURL));
  }
}
