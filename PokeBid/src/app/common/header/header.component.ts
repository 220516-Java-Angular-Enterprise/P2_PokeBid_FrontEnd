import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  
  constructor(private auth: AuthService) { }

  user: any = {}

  ngOnInit(): void {
    this.auth.user$.subscribe(u => {
      this.user = u;
    })

  }
}