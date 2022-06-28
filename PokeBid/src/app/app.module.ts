import { MaterialModule } from './material/material.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './common/header/header.component';
import { NavBarComponent } from './common/header/nav-bar/nav-bar/nav-bar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CardListingsComponent } from './cardListings/card-listings/card-listings.component';
import { CreateListingComponent } from './cardListings/card-listings/createListing/create-listing/create-listing.component';
import { PinnedComponent } from './common/header/nav-bar/nav-bar/pinned/pinned.component';
import { AuthModule } from '@auth0/auth0-angular';
import { environment } from 'src/environments/environment';
import { AuthComponent } from './user/auth/auth.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDialogActions } from '@angular/material/dialog';
import { MatFormField } from '@angular/material/form-field';
import { HttpClientModule } from '@angular/common/http';
import { NotificationComponent } from './common/header/nav-bar/nav-bar/notification/notification.component';
import { MakeSaleComponent } from './sale/make-sale/make-sale.component';
import { LiveAuctionComponent } from './sale/make-sale/live-auction/live-auction.component';
import { DescriptionComponent } from './sale/make-sale/description/description.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CreateAccountComponent } from './user/create-account/create-account.component';
import { ConfirmUserComponent } from './user/confirm-user/confirm-user.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    NavBarComponent,
    CardListingsComponent,
    CreateListingComponent,
    AuthComponent,
    NotificationComponent,
    PinnedComponent,
    MakeSaleComponent,
    LiveAuctionComponent,
    DescriptionComponent,
    CreateAccountComponent,
    ConfirmUserComponent,
  ],
  entryComponents: [CreateListingComponent],
  imports: [
    AuthModule.forRoot({
      domain: environment.authDomain,
      clientId: environment.authClientId
    }),
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }