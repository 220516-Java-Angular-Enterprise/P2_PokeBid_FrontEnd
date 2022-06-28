import { Injectable } from '@angular/core';
import {HttpClient } from '@angular/common/http';
import {firstValueFrom} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HistoryService {

  constructor(private http:HttpClient) { }

  historyURL  = "http://pokebidv2-env.eba-6cei577i.us-east-2.elasticbeanstalk.com/pokebid/user/{{user.id}}/history";
  
  getHistory(): Promise<History[]>{
    return firstValueFrom(this.http.get<History[]>(this.historyURL));
  }
}
