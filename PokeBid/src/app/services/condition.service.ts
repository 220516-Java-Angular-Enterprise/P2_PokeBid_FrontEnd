import { Condition } from './../models/condition';
import { Injectable } from '@angular/core';
import {HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConditionService {

  constructor(private http:HttpClient) { }

  conditionURL  = "http://pokebidv2-env.eba-6cei577i.us-east-2.elasticbeanstalk.com/pokebid/condition";
  
  getAllConditions(): Observable<any>{
    return this.http.get(this.conditionURL);
  }

  getConditionById(id: string): Observable<any>{
    return this.http.get(this.conditionURL + '/' + id);
  }
}
