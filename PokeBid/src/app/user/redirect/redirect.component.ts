import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { AuthService } from '@auth0/auth0-angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-redirect',
  templateUrl: './redirect.component.html',
  styleUrls: ['./redirect.component.css']
})
export class RedirectComponent implements OnInit {

  constructor(private userservice: UserService, private auth: AuthService, private router: Router) { }

  id: string = crypto.randomUUID();
  email?: string = '';

  async ngOnInit() {
    // this.userservice.confirmUser("word")
    await this.auth.user$.subscribe(u=>{
      this.email = u?.email;
    })

    this.userservice.getUsersByEmail(this.email).subscribe((data:any)=>{
      console.log(data)
      if(data == null){
        this.goToCreateAccount(this.id);
      } else {
        this.router.navigateByUrl('');
      }
    })

  }

  goToCreateAccount(id: string){
    this.router.navigateByUrl(`/create-account/${id}`)
  }

  

}
