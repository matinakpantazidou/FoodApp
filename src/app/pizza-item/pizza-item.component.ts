import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Size } from "../constants/pizza.constants";
import { PizzaItemState } from './pizza-item.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pizza-item',
  standalone: true,
  templateUrl: './pizza-item.component.html',
  styleUrl: './pizza-item.component.scss',
  imports: [CommonModule]
})

export class PizzaItemComponent {
  @Input({ required: true }) name!: string;
  @Input({ required: true }) itemId!: number;
  @Input({ required: true }) sizes!: Size[];
  @Input({ required: true }) state!: PizzaItemState;
  @Output() toggleExpand = new EventEmitter<number>();
  @Output() priceChange = new EventEmitter<{itemId: number, sizeId: number, price: number}>();
  @Output() undoChanges = new EventEmitter<number>();

  onPriceChange(sizeId: number, event: Event): void {
    const input = event.target as HTMLInputElement;
    const newPrice = parseFloat(input.value) || 0;
    this.priceChange.emit({ itemId: this.itemId, sizeId, price: newPrice });
  }

  onCheckboxChange(sizeId: number, event: Event): void {
    const checkbox = event.target as HTMLInputElement;
    const newPrice = checkbox.checked ? this.state.initialPrices[sizeId].price : 0;
    this.priceChange.emit({ itemId: this.itemId, sizeId, price: newPrice });
  }

  onUndo(): void {
    this.undoChanges.emit(this.itemId);
  }

  getPriceForSize(sizeId: number): number {
    return this.state.prices[sizeId]?.price || 0;
  }

  isSizeEnabled(sizeId: number): boolean {
    return this.getPriceForSize(sizeId) !== 0;
  }

}
