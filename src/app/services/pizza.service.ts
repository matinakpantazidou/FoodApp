import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { ITEMS, PRICES, SIZES, Price } from '../constants/pizza.constants';

@Injectable({ providedIn: 'root' })
export class PizzaService {
 private prices: Price[] = [...PRICES];
 private isBrowser: boolean;
 constructor(@Inject(PLATFORM_ID) platformId: Object) {
   this.isBrowser = isPlatformBrowser(platformId);
   this.loadSavedPrices();
 }

 getItems() {
   return ITEMS;
 }

 getSizes() {
   return SIZES;
 }

 getPrices() {
   return this.prices;
 }

 getPricesForItem(itemId: number) {
   return this.prices.filter(p => p.itemId === itemId);
 }

 savePrice(itemId: number, sizeId: number, price: number): void {
   const index = this.prices.findIndex(p => p.itemId === itemId && p.sizeId === sizeId);
   if (index !== -1) {
     this.prices[index] = {...this.prices[index], price};
     // Only save to localStorage if running in browser
     if (this.isBrowser) {
       localStorage.setItem('pizzaPrices', JSON.stringify(this.prices));
     }
   }
 }
 
 loadSavedPrices(): void {
   // Only attempt to load from localStorage if running in browser
   if (this.isBrowser) {
     const savedPrices = localStorage.getItem('pizzaPrices');
     if (savedPrices) {
       try {
         this.prices = JSON.parse(savedPrices);
       } catch (e) {
         console.error('Error parsing saved prices:', e);
         // Fall back to default prices if parsing fails
         this.prices = [...PRICES];
       }
     }
   }
 }
}
