import { Injectable } from '@angular/core';
import {HttpClient } from '@angular/common/http';
import {firstValueFrom} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HistoryService {

  constructor(private http:HttpClient) { }

  historyURL  = "http://localhost:8080/pokebid/user/{{user.id}}/history";
  
  getHistory(): Promise<History[]>{
    return firstValueFrom(this.http.get<History[]>(this.historyURL));
  }
}
