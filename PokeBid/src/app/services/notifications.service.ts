import { NotificationRequest } from './../models/dtos/notificationRequest';
import { HttpClient } from '@angular/common/http';
import { Component, Injectable } from '@angular/core';
import { firstValueFrom, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

@Component(
  {
    selector: 'app-navbar',
    template: `
    <p></p>
    `
  }
)

export class NotificationsService {

  constructor(private http:HttpClient) { }


  private notificationUrl = "http://pokebidv2-env.eba-6cei577i.us-east-2.elasticbeanstalk.com/pokebid/notification/";

  getNotificationsByUserId(id: string): Observable<any>{
    return this.http.get(this.notificationUrl + id);

  }

  postNotification(notification: NotificationRequest){
    return firstValueFrom(this.http.post<any>(this.notificationUrl, notification))
  }

  deleteNotification(id: any){
    console.log("Deleting: " + id);
    this.http.delete(this.notificationUrl + '/' + 'delete' + '/' + id).subscribe((data:any)=> { id = data; console.log(id); });
    
  }
}
