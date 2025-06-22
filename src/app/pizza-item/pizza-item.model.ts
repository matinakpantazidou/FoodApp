import { Price } from "../constants/pizza.constants";

export interface PizzaItemState {
 expanded: boolean;
 prices: { [sizeId: number]: Price };
 initialPrices: { [sizeId: number]: Price };
 hasChanges: boolean;
}
