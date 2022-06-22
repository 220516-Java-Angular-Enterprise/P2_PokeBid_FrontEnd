import { Condition } from './../models/condition';
import { Injectable } from '@angular/core';
import {HttpClient } from '@angular/common/http';
import {firstValueFrom} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConditionService {

  constructor(private http:HttpClient) { }

  conditionURL  = "http://localhost:8080/pokebid/condition";
  
  getAllConditions(): Promise<Condition[]>{
    return firstValueFrom(this.http.get<Condition[]>(this.conditionURL));
  }
}
