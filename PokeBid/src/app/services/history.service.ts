import { HistoryRequest } from './../models/dtos/historyRequest';
import { Injectable } from '@angular/core';
import {HttpClient } from '@angular/common/http';
import {firstValueFrom, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HistoryService {

  constructor(private http:HttpClient) { }

  historyURL  = "http://pokebidv2-env.eba-6cei577i.us-east-2.elasticbeanstalk.com/pokebid/history";
  
  getHistory(): Promise<History[]>{
    return firstValueFrom(this.http.get<History[]>(this.historyURL));
  }

  getHistoryByUserId(id: string): Observable<any>{
    return this.http.get<any>(this.historyURL + "/users/" + id)
  }

  postHistory(request: HistoryRequest){
    return firstValueFrom(this.http.post<any>(this.historyURL, request));
  }
  
}
