import { Injectable } from '@angular/core';
import {HttpClient } from '@angular/common/http';
import { firstValueFrom, Observable } from 'rxjs';
import { User } from '../models/users';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient) { }

 
  private userURL = "http://pokebidv2-env.eba-6cei577i.us-east-2.elasticbeanstalk.com/pokebid/users"
  
  getAllUsers(): Observable<User[]>{
    return this.http.get<User[]>(this.userURL);
  }

  getUserById(id: string): Promise<User>{
    return firstValueFrom(this.http.get<User>(this.userURL + "/" + id));
  }

  getUsersByEmail(email?: string): Observable<User>{
    return this.http.get<User>(this.userURL + '/get-by-email/' + email)
  }

}
