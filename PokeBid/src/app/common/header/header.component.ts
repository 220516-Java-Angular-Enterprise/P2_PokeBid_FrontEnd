import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { AuthComponent } from 'src/app/user/auth/auth.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor() { }

  user: any = {}

  ngOnInit(): void {
  }
}