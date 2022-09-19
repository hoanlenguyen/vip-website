import { ApiStatus, Product } from "@shared-app/data-access/models";

export interface ProductDetailState {
    product: Product | null,
    productId: number;
    selectedQuantity: number;
    selectedColor: string,
    errors: Record<string, string[]>;
    status: ApiStatus;
}