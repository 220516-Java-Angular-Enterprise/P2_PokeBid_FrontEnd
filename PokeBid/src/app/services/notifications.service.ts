import { HttpClient } from '@angular/common/http';
import { Component, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

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

  getNotifications(id: string): Observable<any>{
    return this.http.get(this.notificationUrl + id);
  }

}
