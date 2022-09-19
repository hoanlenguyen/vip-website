import { Product } from "./product.model";

export interface ShoppingCart {
    id: string;
    product: Product;
    subTotal: number;
    quantity: number;
    [key: string]: unknown;
}


