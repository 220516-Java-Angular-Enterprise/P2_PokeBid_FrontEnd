import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AutomatedNewUser } from 'src/app/models/automatednewuser';
import { NewUserRegistrationClass } from 'src/app/models/newuserregistrationclass';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.css']
})



export class CreateAccountComponent implements OnInit {

  myUser: User = new User;

  currentEmail: string = "";
  
  constructor(private userService: UserService, private currRouter: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.currRouter.params.subscribe(p => {
      this.currentEmail = p['email'];
      // this.listingService.getCardListingById(this.id).toPromise().then((data: any) =>{
      //   this.listing = data;
      // })
    });
    console.log("THIS BEST BE THE EMAIL!");
    console.log(this.currentEmail);
  }

  onAutomatedNewUser(data: AutomatedNewUser){

    
  }

  onSubmitNewUser(data: NewUserRegistrationClass): void {
    
    

    
    let newUserRegistration: NewUserRegistrationClass = {
      username: data.username,
      password: 'P@ssw0rd',
      address: data.address,
      email: this.currentEmail
    };
    console.log("HERE IS THE REGISTRATION OBJ");
    console.log(newUserRegistration);


    /*let notification1: NotificationRequest = {
      user_id: this.currentListing.auction_bidder.id,
      auction_id: this.currentListing.id,
      message: "Someone has outbid you on this auction."
    } */


    this.userService.postNewUser(newUserRegistration).subscribe( (newUser) => (console.log(newUser)) );

    this.router.navigateByUrl(`/`);
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