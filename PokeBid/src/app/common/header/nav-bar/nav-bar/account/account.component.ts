import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user';
import { Router } from '@angular/router';
@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  constructor(public auth: AuthService, private userService: UserService, public router: Router) { }

  isLoggedIn: boolean = false;
  email?:string = '';
  user: User = {
  id: '',
  username: '',
  password: '',
  address: '',
};

  ngOnInit(): void {
    this.auth.isAuthenticated$.subscribe(a=>{
      this.isLoggedIn = a;
      this.auth.user$.subscribe(u =>{
        this.email = u?.email;
        this.userService.getUsersByEmail(this.email).subscribe(data =>{
          this.user = data;
        })
      })
    })
  }

  goToProfile(){
    this.router.navigateByUrl(`account/${this.user.id}`)
  }

}
