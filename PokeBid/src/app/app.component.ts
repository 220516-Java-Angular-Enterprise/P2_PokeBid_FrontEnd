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
  isLoggedIn: boolean = false;
  email?:string = '';
  id: string = crypto.randomUUID();

  constructor(private auth: AuthService, private userservice: UserService, private router: Router,){}

  user: User = User


  async ngOnInit(){
  await this.auth.isAuthenticated$.subscribe((data:boolean) => {
    this.isLoggedIn = data;
  })
  await this.auth.user$.subscribe(u=>{
      this.email = u?.email;
      
      this.userservice.getUsersByEmail(this.email).toPromise().then((data:any)=>{
        this.user = data;
        console.log(this.user);
      if(this.user == null){
        this.goToCreateAccount(this.id);
      } else {
        this.router.navigateByUrl('');
      }
    })
    })
    


  }

  goToCreateAccount(id: string){
    this.router.navigateByUrl(`create-account/${id}`)
  }

  hasRoute(route: string): boolean{
    return this.router.url === route;
  }

}
