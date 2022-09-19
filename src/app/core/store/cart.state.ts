import { ApiStatus, ProductInCart, ShoppingCart } from "@shared-app/data-access/models"

export interface CartState {
    shoppingCarts: ShoppingCart[];
    products: ProductInCart[]; 
    errors: Record<string, string[]>;
    status: ApiStatus;
}
