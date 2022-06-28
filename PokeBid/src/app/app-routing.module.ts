import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DescriptionComponent } from './sale/make-sale/description/description.component';
import { AccountComponent } from './common/header/nav-bar/nav-bar/account/account.component';
import { ProfileComponent } from './user/profile/profile.component';
const routes: Routes = [
  {
    path: 'make-sale',
    component: DescriptionComponent,
  },
  {
    path: "profile",
    component: ProfileComponent,
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
