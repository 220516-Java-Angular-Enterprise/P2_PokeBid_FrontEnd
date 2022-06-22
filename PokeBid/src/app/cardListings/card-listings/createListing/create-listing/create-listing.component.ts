import { UserService } from './../../../../services/user.service';
import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';



@Component({
  selector: 'app-create-listing',
  templateUrl: './create-listing.component.html',
  styleUrls: ['./create-listing.component.css']
})


export class CreateListingComponent implements OnInit {
  uservice: any;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, uservice:UserService) { }

  ngOnInit(): void {
    this.uservice.getAllUsers().subscribe((data: any) => {
      console.log(data);
    })
  }
  

}



