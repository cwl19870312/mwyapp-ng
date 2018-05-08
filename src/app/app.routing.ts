import { Routes, RouterModule } from '@angular/router';
import { BankListComponent } from './bank/bankList/bankList.component';
import { NgClass } from '@angular/common';
import { NgModule } from '@angular/core';
import { BankDetailComponent } from './bank/bankDetail/bankDetail.component';
import { IndexComponent } from './index/index.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: 'index', component: IndexComponent},
  { path: 'home', component: HomeComponent},
  { path: 'bank', component: BankListComponent },
  { path: 'bank/:uid', component: BankDetailComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
