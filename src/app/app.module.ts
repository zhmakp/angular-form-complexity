import { PreOrderComponent } from './components/pre-order/pre-order.component';
import { AddressComponent } from './components/address/address.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AppSelectComponent } from './shared/app-select.component';

const COMPONENTS = [AddressComponent, AppSelectComponent, PreOrderComponent] 

@NgModule({
  declarations: [
    AppComponent, ...COMPONENTS
  ],
  imports: [
    BrowserModule, ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
