import { Component, OnInit } from '@angular/core';
import { PizzaService } from './services/pizza.service';
import { ITEMS, Price, SIZES } from './constants/pizza.constants';
import { PizzaItemState } from './pizza-item/pizza-item.model';
import { PizzaItemComponent } from './pizza-item/pizza-item.component';
import { CommonModule } from '@angular/common';

@Component({
 selector: 'app-root',
 standalone: true,
 imports: [CommonModule, PizzaItemComponent],
 templateUrl: './app.component.html',
 styleUrl: './app.component.scss'
})

export class AppComponent implements OnInit {
 items = ITEMS;
 sizes = SIZES;
 itemsState: Record<number, PizzaItemState> = {};
 constructor(public pizzaService: PizzaService) {}
 
 ngOnInit() {
   // Service already loaded prices in its constructor
   this.initializeItemsState();
 }

 private initializeItemsState() {
   this.items.forEach(item => {
     const prices = this.pizzaService.getPricesForItem(item.itemId);
     // Create a map of prices by sizeId
     const pricesMap = prices.reduce((acc, price) => {
       acc[price.sizeId] = { ...price };
       return acc;
     }, {} as { [sizeId: number]: Price });
     // Initialize state
     this.itemsState[item.itemId] = {
       expanded: false,
       prices: { ...pricesMap },
       initialPrices: JSON.parse(JSON.stringify(pricesMap)),
       hasChanges: false
     };
   });
 }

 toggleExpand(itemId: number): void {
   Object.keys(this.itemsState).forEach(id => {
     const numId = Number(id);
     this.itemsState[numId].expanded = numId === itemId ? !this.itemsState[numId].expanded : false;
   });
 }

 onPriceChange(itemId: number, sizeId: number, price: number): void {
   this.itemsState[itemId].prices[sizeId].price = price;
   this.pizzaService.savePrice(itemId, sizeId, price);
   this.checkForChanges(itemId);
 }

 onUndoChanges(itemId: number): void {
   const state = this.itemsState[itemId];
   // Revert to initial prices
   state.prices = JSON.parse(JSON.stringify(state.initialPrices));
   state.hasChanges = false;
   // Update service and storage
   Object.keys(state.prices).forEach(sizeId => {
     const numSizeId = Number(sizeId);
     this.pizzaService.savePrice(itemId, numSizeId, state.prices[numSizeId].price);
   });
 }

 private checkForChanges(itemId: number): void {
   const state = this.itemsState[itemId];
   state.hasChanges = Object.keys(state.prices).some(sizeId => {
     const numSizeId = Number(sizeId);
     return state.prices[numSizeId].price !== state.initialPrices[numSizeId].price;
   });
 }
}
