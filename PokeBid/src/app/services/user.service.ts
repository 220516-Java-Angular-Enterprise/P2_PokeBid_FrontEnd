import { Injectable } from '@angular/core';
import {HttpClient } from '@angular/common/http';
import {firstValueFrom, Observable} from 'rxjs';
import { User } from '../models/users';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient) { }

 
  private userURL = "http://pokebidv2-env.eba-6cei577i.us-east-2.elasticbeanstalk.com/pokebid/users"
  
  getAllUsers(): Promise<User[]>{
    return firstValueFrom(this.http.get<User[]>(this.userURL));
  }

  getUserById(id: string): Observable<any>{
    return this.http.get<any>(this.userURL + "/" + id)
  }

  getTest(): Promise<any[]>{
      return firstValueFrom(this.http.get<any[]>('https://jsonplaceholder.typicode.com/todos/1'))
  }

  

}
