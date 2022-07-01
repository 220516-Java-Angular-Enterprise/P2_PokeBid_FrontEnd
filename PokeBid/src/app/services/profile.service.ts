import { Injectable } from '@angular/core';

import {HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable} from 'rxjs';
import { Component } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
@Component({
  selector: 'app-profile',
  template: `
  <p></p>
  `
})
export class ProfileService {

  apiUrl  = 'http://pokebidv2-env.eba-6cei577i.us-east-2.elasticbeanstalk.com/pokebid/users/get-by-email/'; //Add user ID

  fullLink: string = "";

  constructor(private http:HttpClient) { }

  getUser(emailToCheck: string): Observable<any[]>{
    this.fullLink = this.apiUrl + emailToCheck;
    return this.http.get<any[]>(this.fullLink);
  }

  
}

