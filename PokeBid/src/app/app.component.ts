import { Component, OnInit} from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthService, AuthState, User } from '@auth0/auth0-angular';
import {HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'PokeBid';

  isLoggedIn = false;
  user: any = {}

  ngOnInit(){
    this.auth.isAuthenticated$.subscribe(b => {
      this.isLoggedIn = b;
      });
      this.auth.user$.subscribe(u => {
        this.user = u;
        console.log("HERE IS THE OTHER OTHER OTHER LOG!!!!");
      console.log(this.user);
      });
      console.log("HERE IS THE LOG!!!!");
      console.log(this.user);
  }
  

  constructor(public auth: AuthService){
    
  }


}