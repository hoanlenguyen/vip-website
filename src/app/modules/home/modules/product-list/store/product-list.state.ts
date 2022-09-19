import { ApiStatus, Pagination, Product } from "@shared-app/data-access/models";

export interface ProductListState {
    products: Product[];
    pagination: Pagination,
    errors: Record<string, string[]>;
    status: ApiStatus;
}