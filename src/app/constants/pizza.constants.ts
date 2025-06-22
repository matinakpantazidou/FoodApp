export interface Item {
  itemId: number;
  name: string;
 }
 export interface Size {
  sizeId: number;
  name: string;
 }
 export interface Price {
  itemId: number;
  sizeId: number;
  price: number;
 }
 export const ITEMS: Item[] = [
  { itemId: 0, name: 'Margherita' },
  { itemId: 1, name: 'Pepperoni' }
 ];
 export const SIZES: Size[] = [
  { sizeId: 0, name: 'Small' },
  { sizeId: 1, name: 'Medium' },
  { sizeId: 2, name: 'Large' }
 ];
 export const PRICES: Price[] = [
  { itemId: 0, sizeId: 0, price: 3.99 },
  { itemId: 0, sizeId: 1, price: 5.99 },
  { itemId: 0, sizeId: 2, price: 7.99 },
  { itemId: 1, sizeId: 0, price: 4.42 },
  { itemId: 1, sizeId: 1, price: 6.52 },
  { itemId: 1, sizeId: 2, price: 8.62 }
 ];
