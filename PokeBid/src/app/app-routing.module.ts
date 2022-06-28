import { RedirectComponent } from './user/redirect/redirect.component';
import { CreateAccountComponent } from './user/create-account/create-account.component';
import { MakeSaleComponent } from './sale/make-sale/make-sale.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { DescriptionComponent } from './sale/make-sale/description/description.component';
const routes: Routes = [
  {
    path: 'make-sale/:id',
    component: MakeSaleComponent
  },
  {
    path: 'create-account/:id',
    component: CreateAccountComponent
  },
  {
    path: 'redirect',
    component: RedirectComponent
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
