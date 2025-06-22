import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { PizzaItemComponent } from './pizza-item/pizza-item.component';

@NgModule({
 declarations: [
   AppComponent
 ],
 imports: [
   BrowserModule,
   CommonModule,
   FormsModule,
   PizzaItemComponent
 ],
 providers: [],
 bootstrap: [AppComponent]
})

export class AppModule { }
