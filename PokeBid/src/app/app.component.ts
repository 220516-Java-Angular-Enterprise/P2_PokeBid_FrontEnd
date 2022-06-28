import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'PokeBid';
  isLoggedIn = false;

  constructor(private auth: AuthService){
  
  }

  async ngOnInit(){
  await this.auth.isAuthenticated$.subscribe(data => {
    this.isLoggedIn = data;
  })
  }

}
