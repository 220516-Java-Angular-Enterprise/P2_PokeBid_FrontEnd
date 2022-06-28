import { MakeSaleComponent } from './sale/make-sale/make-sale.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { DescriptionComponent } from './sale/make-sale/description/description.component';
const routes: Routes = [
  {
    path: 'make-sale/:id',
    component: MakeSaleComponent
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
