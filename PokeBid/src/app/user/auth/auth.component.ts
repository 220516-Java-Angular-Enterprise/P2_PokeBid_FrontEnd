import { Component, OnInit } from '@angular/core';
import { AuthService, AuthState } from '@auth0/auth0-angular';
import {HttpClient } from '@angular/common/http';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  constructor(public auth: AuthService) { }

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
  