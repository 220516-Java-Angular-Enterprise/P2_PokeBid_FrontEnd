import { Review } from './../models/review';
import { Injectable } from '@angular/core';
import {HttpClient } from '@angular/common/http';
import {firstValueFrom} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  constructor(private http:HttpClient) { }

  reviewURL  = "http://localhost:8080/user/{{user.id}}/reviews";
  
  getReviews(): Promise<Review[]>{
    return firstValueFrom(this.http.get<Review[]>(this.reviewURL));
  }
}
