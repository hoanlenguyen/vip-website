import { ApiStatus, Category } from "@shared-app/data-access/models";

export interface CategoryListState {
    selectedId: number | null;
    categories: Category[];
    limit: number;
    errors: Record<string, string[]>;
    status: ApiStatus;
}