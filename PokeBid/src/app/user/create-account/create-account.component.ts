import { Component, inject, OnInit } from '@angular/core';
import { NewUserRegistrationClass } from 'src/app/models/newuserregistrationclass';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.css']
})



export class CreateAccountComponent implements OnInit {

  
  
  constructor(private userService: UserService) { }

  ngOnInit(): void {
  }

  onSubmitNewUser(data: NewUserRegistrationClass): void {
    
    

    
    let newUserRegistration: NewUserRegistrationClass = {
      username: data.username,
      password: data.password,
      address: data.address,
      email: data.email
    }


    /*let notification1: NotificationRequest = {
      user_id: this.currentListing.auction_bidder.id,
      auction_id: this.currentListing.id,
      message: "Someone has outbid you on this auction."
    } */


    this.userService.postNewUser(newUserRegistration).subscribe( (newUser) => (console.log(newUser)) );
  }

}

/*
User{
  id: string;
  username: string;
  password: string;
  address: string;
  role?: string;
  email?: string;
  reviews?: Review[];
  pinned?: Pinned[]; 
  history?: History[];
  listings?: CardListing[]; 
*/