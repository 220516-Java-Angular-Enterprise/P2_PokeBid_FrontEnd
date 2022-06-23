import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import {HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  constructor(private auth: AuthService) { }

  private userURL = "http://localhost:8080/pokebid/auth";

  isLoggedIn: boolean = false;

  ngOnInit(): void {
    this.auth.isAuthenticated$.subscribe(b => {
      this.isLoggedIn = b;
    })
  }

  logIn(): void {
    this.auth.loginWithRedirect();
  }

  logOut(): void {
    this.auth.logout();
    
  }

}
  