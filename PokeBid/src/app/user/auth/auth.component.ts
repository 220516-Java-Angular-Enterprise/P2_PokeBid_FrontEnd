import { Component, OnInit } from '@angular/core';
import { AuthService, AuthState } from '@auth0/auth0-angular';
import {HttpClient } from '@angular/common/http';
import { DOCUMENT } from '@angular/common';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  constructor(public auth: AuthService, private router: Router, private userService: UserService) { }

  isLoggedIn: boolean = false;
  user: User = {
    id: '',
    username: '',
    password: '',
    address: '',
  };
  email?: string = '';




  

  ngOnInit(): void {
    this.auth.isAuthenticated$.subscribe(b => {
    this.isLoggedIn = b;
    })



    this.auth.isAuthenticated$.subscribe(data =>{
      this.isLoggedIn = data;

        if(this.isLoggedIn){
          this.auth.user$.subscribe(u=>{
            this.email = u?.email;
            this.userService.getUsersByEmail(this.email).toPromise().then((data:any)=>{
              this.user = data;
            })
          })
        }
    });



  }

  logIn(): void {
    this.auth.loginWithRedirect();
    console.log("I THINK THIS IS THE LOG IN THINGY!");
    console.log(this.auth.getUser);
    this.userService
  }

  register(): void{
    //this.router.navigateByUrl(`create-account/abc`)
    //this.userService.postNewAutomatedUser();
  }

  logOut(): void {
    this.auth.logout();
    
  }


}
  