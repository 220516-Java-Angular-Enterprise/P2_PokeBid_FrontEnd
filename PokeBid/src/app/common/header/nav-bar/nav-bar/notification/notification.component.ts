import { User } from 'src/app/models/users';
import { CardListing } from 'src/app/models/cardListing';
import { Component, OnInit } from '@angular/core';
import { Notification } from 'src/app/models/notification';
import {HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { NotificationsService } from 'src/app/services/notifications.service';
import { PokemonService } from 'src/app/services/pokemon.service';
import { AuthService } from '@auth0/auth0-angular';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {

  constructor(private notificationsService: NotificationsService, private http:HttpClient, private pokemon: PokemonService, private router: Router, private auth: AuthService, private userService: UserService) { }

  fullNotifications: Notification[] = [];
  isLoggedIn: boolean = false;
  email: string = '';
  user: User = {
    id: '',
    username: '',
    password: '',
    address: '',
  }; 
  ngOnInit(): void {
  this.auth.user$.subscribe((u:any)=>{
    this.email = u.email;
    this.userService.getUsersByEmail(this.email).subscribe(data=>{ 
      this.user = data;
        this.notificationsService.getNotificationsByUserId(this.user.id).subscribe(notifs=>{
          this.fullNotifications = notifs;
    })
    })
  })

  }

  goToListing(id: any){
    this.router.navigateByUrl(`make-sale/${id}`)
    console.log(id);
  }
  

}

