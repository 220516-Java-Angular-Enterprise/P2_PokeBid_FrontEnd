import { CreateListingComponent } from './createListing/create-listing/create-listing.component';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-card-listings',
  templateUrl: './card-listings.component.html',
  styleUrls: ['./card-listings.component.css']
})
export class CardListingsComponent implements OnInit {

  constructor(private dialog: MatDialog) { }

  openDialog(){
    let dialogRef = this.dialog.open(CreateListingComponent, {data: {
      name: "Hai"
    }})
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`)
    })
  }
  ngOnInit(): void {
  }

}
