import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BidsComponent } from './bids/bids.component';
import { ChangeEmailComponent } from './change-email/change-email.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { SalesComponent } from './sales/sales.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
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
}
