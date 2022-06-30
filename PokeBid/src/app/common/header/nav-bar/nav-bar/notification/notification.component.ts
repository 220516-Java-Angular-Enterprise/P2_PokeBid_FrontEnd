import { User } from 'src/app/models/user';
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
            this.fullNotifications.forEach(notification => {
              this.pokemon.getCardById(notification.cardListing.card_id).subscribe(data=> {
              notification.cardListing.card_name = data.data[0].name

        })
      })
    })
    })
  })

  }

  getNotifications() {
    this.notificationsService.getNotificationsByUserId(this.user.id).toPromise().then((data:any) => {
      this.fullNotifications = data;
      console.log(this.fullNotifications)

      this.fullNotifications.forEach(notification => {
        this.pokemon.getCardById(notification.cardListing.card_id).subscribe(data=> {
          notification.cardListing.card_name = data.data[0].name
          console.log(notification);
        })
      })
    })
  }

  goToListing(id: any){
    this.router.navigateByUrl(`make-sale/${id}`)
    console.log(id);
  }


  deleteNotification(id: any){
    this.notificationsService.deleteNotification(id);
    this.getNotifications();
    console.log("After Deleting It: " + this.fullNotifications)
  }



}

