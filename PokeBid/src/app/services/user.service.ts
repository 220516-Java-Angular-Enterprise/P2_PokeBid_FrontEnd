import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders } from '@angular/common/http';
import { firstValueFrom, Observable } from 'rxjs';
import { User } from '../models/user';
import { NewUserRegistrationClass } from '../models/newuserregistrationclass';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient) { }

 
  private userURL = "http://pokebidv2-env.eba-6cei577i.us-east-2.elasticbeanstalk.com/pokebid/users"
  private userRegisterURL = "http://pokebidv2-env.eba-6cei577i.us-east-2.elasticbeanstalk.com/pokebid/users/register"
  
  getAllUsers(): Observable<User[]>{
    return this.http.get<User[]>(this.userURL);
  }

  getUserById(id: string): Promise<User>{
    return firstValueFrom(this.http.get<User>(this.userURL + "/" + id));
  }

  getUsersByEmail(email?: string): Observable<User>{
    return this.http.get<User>(this.userURL + '/get-by-email/' + email)
  }

  postNewUser(newUserToRegister: NewUserRegistrationClass):Observable<NewUserRegistrationClass>{
    return this.http.post<any>(this.userRegisterURL, newUserToRegister);
  }
  

}
