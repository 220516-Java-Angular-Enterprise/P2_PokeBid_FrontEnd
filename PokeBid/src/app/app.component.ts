import { CreateAccountComponent } from './user/create-account/create-account.component';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthService, User } from '@auth0/auth0-angular';
import { UserService } from './services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'PokeBid';

  constructor(private auth: AuthService, private userservice: UserService, private router: Router,){}

  isLoggedIn: boolean = false;
  email?:string = '';
  user: User = User

  async ngOnInit(){
  this.auth.isAuthenticated$.subscribe((data:boolean) => { //Checks if user is logged in.
    this.isLoggedIn = data;
    if(this.isLoggedIn){ //If Logged in, get emails
    this.auth.user$.subscribe(u=>{
    this.email = u?.email;
    
    this.userservice.getUsersByEmail(this.email).toPromise().then((data:any)=>{ //Fetch User by Email
      this.user = data;
      console.log(this.user);
    if(this.user == null){ //If User doesnt exist by Email
      this.goToCreateAccount(this.email); // Go to Create Account
    } else {
      this.router.navigateByUrl(''); // Go to Homepage
    }
  })
  })
  }

  })



  }

  goToCreateAccount(email?: string){
    this.router.navigateByUrl(`create-account/${email}`)
  }

  hasRoute(route: string): boolean{
    return this.router.url === route;
  }

}
