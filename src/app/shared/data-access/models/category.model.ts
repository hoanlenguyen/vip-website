import { Pagination } from "./reposne.model"

export interface Category {
    id: number,
    name: string
}

export interface CategoryList {
    categories: Category[],
    pagination: Pagination
}