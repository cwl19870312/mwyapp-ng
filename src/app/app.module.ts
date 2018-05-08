import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

import { AppComponent } from './app.component';
import { NetService } from './service/net.service';
import { BankService } from './service/bank.service';
import { AppRoutingModule } from './app.routing';
import { BankListComponent } from './bank/bankList/bankList.component';
import { BankDetailComponent } from './bank/bankDetail/bankDetail.component';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { ToastService, ComponentModule } from './component';
import { IndexComponent } from './index/index.component';
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    BankListComponent,
    BankDetailComponent,
    IndexComponent,
    HomeComponent
],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ComponentModule
  ],
  providers: [
    NetService,
    BankService,
    ToastService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
