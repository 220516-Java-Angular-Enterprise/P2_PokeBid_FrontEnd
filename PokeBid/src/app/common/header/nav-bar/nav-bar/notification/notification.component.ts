import { CardListing } from 'src/app/models/cardListing';
import { Component, OnInit } from '@angular/core';
import { Notification } from 'src/app/models/notification';
import {HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { NotificationsService } from 'src/app/services/notifications.service';
import { PokemonService } from 'src/app/services/pokemon.service';


@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {

  constructor(private notificationsService: NotificationsService, private http:HttpClient, private pokemon: PokemonService, private router: Router) { }

  fullNotifications: Notification[] = [];

  async ngOnInit() {
    await this.notificationsService.getNotifications().toPromise().then((data:any) => {
      this.fullNotifications = data;
      console.log(this.fullNotifications)

      this.fullNotifications.forEach(notification => {
        this.pokemon.getCardById(notification.cardListing.card_id).subscribe(data=> {
          notification.cardListing.card_name = data.data[0].name
          console.log(notification);
        })
      })
    })
    console.log(this.fullNotifications)
  }

  goToListing(id: any){
    this.router.navigateByUrl(`make-sale/${id}`)
    console.log(id);
  }
  
  //ngOnInit(): void {
//
//    this.notificationsService.getPinned().subscribe( (listing) => {this.fullNotifications = listing
//    this.fullNotifications.forEach(notification => {
//      this.pokemon.getCardById(notification.listing.card_id).subscribe((json) => {
 //       notification.listing.card_name = json.data[0].name
 //     })
 //   })
 //   });
 // }

}
