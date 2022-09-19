import { Category } from "./category.model"
import { Pagination } from "./reposne.model"

export interface ProductList {
    products: Product[];
    pagination: Pagination;
}

export interface Product {
    id: number;
    name: string;
    category: Category;
    quantity: number;
    min_purchase_qty: number;
    cost: string;
    price: string;
    status: number;
    created_by: any;
    updated_by: any;
    images: ProductImage[];
    short_description: string;
    long_description: string;
    variants: string[]; //TODO: Option just waiting for BE model
}

export interface ProductImage {
    id: number;
    filename: string;
    url: string;
    type: any;
}

export interface ProductInCart {
    cartId: string;
    productId: number;
    quantity: number;
    subInformations: Record<string, unknown>
}