import { ApiStatus, ShoppingCart } from "@shared-app/data-access/models";

export interface ShoppingCartState {
    shoppingCartList: ShoppingCart[];
    grandTotal: number;
    errors: Record<string, string[]>;
    status: ApiStatus;
}