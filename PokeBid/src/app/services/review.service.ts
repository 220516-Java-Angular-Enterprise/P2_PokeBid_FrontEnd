import { Review } from './../models/review';
import { Injectable } from '@angular/core';
import {HttpClient } from '@angular/common/http';
import {firstValueFrom} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  constructor(private http:HttpClient) { }

  reviewURL  = "http://pokebidbackend-env.eba-dbmd43p6.us-east-2.elasticbeanstalk.com/pokebid/user/{{user.id}}/reviews";
  
  getReviews(): Promise<Review[]>{
    return firstValueFrom(this.http.get<Review[]>(this.reviewURL));
  }
}
