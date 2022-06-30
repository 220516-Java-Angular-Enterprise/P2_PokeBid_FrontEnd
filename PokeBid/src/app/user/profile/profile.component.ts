import { FavoritesComponent } from './favorites/favorites.component';
import { History } from './../../models/history';
import { Review } from './../../models/review';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BidsComponent } from './bids/bids.component';
import { ChangeEmailComponent } from './change-email/change-email.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { SalesComponent } from './sales/sales.component';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private dialog: MatDialog, private userService: UserService, private currRoute: ActivatedRoute) { }

  user: User = {id: "", username: "", password: "", address: "", role: "", email: ""}
  id: string = '';

  async ngOnInit(){
    this.currRoute.params.subscribe(p =>{
      this.id = p['id'];
      this.userService.getUserById(this.id).then((data:any) => {
      this.user = data
      console.log(this.user)
    })
    })

  }



  // Dialog
  openBidDialog(){
    let dialogRef = this.dialog.open(BidsComponent, {data: {

    }})

    dialogRef.afterClosed().subscribe(result => {
    console.log(`Dialog result: ${result}`)
    })
  }

  // Dialog
  openSaleDialog(){
    let dialogRef = this.dialog.open(SalesComponent, {data: {

    }})

    dialogRef.afterClosed().subscribe(result => {
    console.log(`Dialog result: ${result}`)
    })
  }

  // Dialog
  openPrivacyDialog(){
    let dialogRef = this.dialog.open(PrivacyPolicyComponent, {data: {

    }})

    dialogRef.afterClosed().subscribe(result => {
    console.log(`Dialog result: ${result}`)
    })
  }

  // Dialog
  openChangePasswordDialog(){
    let dialogRef = this.dialog.open(ChangePasswordComponent, {data: {

    }})

    dialogRef.afterClosed().subscribe(result => {
    console.log(`Dialog result: ${result}`)
    })
  }

  // Dialog
  openChangeEmailDialog(){
    let dialogRef = this.dialog.open(ChangeEmailComponent, {data: {

    }})

    dialogRef.afterClosed().subscribe(result => {
    console.log(`Dialog result: ${result}`)
    })
  }

  // Dialog
  openFavoritesDialog(){
    let dialogRef = this.dialog.open(FavoritesComponent, {data: {

    }})

    dialogRef.afterClosed().subscribe(result => {
    console.log(`Dialog result: ${result}`)
    })
  }
}
