import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-confirm-user',
  templateUrl: './confirm-user.component.html',
  styleUrls: ['./confirm-user.component.css']
})
export class ConfirmUserComponent implements OnInit {

  constructor(private auth: AuthService) { }

  ngOnInit(): void {
  }

  

  logIn(): void {
this.auth.loginWithRedirect({
      // redirect_uri: 'https://pokebid-frontend.s3.us-east-2.amazonaws.com/index.html'
      // redirect_uri: 'http://localhost:4200'
    });
  }

}
