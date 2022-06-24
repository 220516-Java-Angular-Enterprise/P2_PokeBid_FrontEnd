import { Review } from './../models/review';
import { Injectable } from '@angular/core';
import {HttpClient } from '@angular/common/http';
import {firstValueFrom} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  constructor(private http:HttpClient) { }

  reviewURL  = "http://pokebidv2-env.eba-6cei577i.us-east-2.elasticbeanstalk.com/pokebid/user/{{user.id}}/reviews";
  
  getReviews(): Promise<Review[]>{
    return firstValueFrom(this.http.get<Review[]>(this.reviewURL));
  }
}
