import { HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { VIPHomeStore } from "@app-modules/home/store/home.store";
import { ComponentStore, tapResponse } from "@ngrx/component-store";
import { VIPCategoryAPI } from "@shared-app/data-access/apis/category.api";
import { exhaustMap, tap } from "rxjs";
import { CategoryListState } from "./category-list.state";

@Injectable()
export class VIPCategoryListStore extends ComponentStore<CategoryListState> {

    readonly categories$ = this.select((state) => state.categories);
    readonly selectedId$ = this.select((state) => state.selectedId);
    readonly limit$ = this.select((state) => state.limit);
    readonly status$ = this.select((state) => state.status);
    readonly erros$ = this.select((state) => state.errors);

    readonly vm$ = this.select(
        this.status$,
        this.erros$,
        this.categories$,
        this.limit$,
        this.selectedId$,
        (status, errors, categories, limit, selectedId) => ({ status, errors, categories, limit, selectedId }),
        { debounce: true }
    );

    readonly loadCategoriesEffect = this.effect<number>((trigger$) =>
        trigger$.pipe(
            tap((limit) => this.patchState({ limit: limit }))
        )
    );

    readonly loadProductsByCategoryIdEffect = this.effect<number | null>((trigger$) =>
        trigger$.pipe(
            tap((selectedId) => {
                if (!selectedId) {
                    return;
                }
                this.patchState({ selectedId });
                this._homeStore.updateCategoryIdsEffect(selectedId);
            })
        )
    );

    private readonly _initializeEffect = this.effect<number>((trigger$) =>
        trigger$.pipe(
            tap((_) => this.patchState({ status: "loading" })),
            exhaustMap((limit) => this._categoryApi.getCategoryList(limit).pipe(
                tapResponse(
                    (response) => {
                        if (!response || !response.success || response.data.categories.length === 0) {
                            return;
                        }
                        this.patchState({
                            categories: response.data.categories,
                            status: "success",
                            selectedId: response.data.categories[0].id
                        });
                    },
                    ({ error }: HttpErrorResponse) => {
                        this.patchState({ errors: error?.errors || {}, status: "error" })
                    }
                )
            ))
        )
    );

    constructor(
        private readonly _categoryApi: VIPCategoryAPI,
        private readonly _homeStore: VIPHomeStore
    ) {
        super(initializeState);
        this._initializeEffect(this.limit$);
        this.loadProductsByCategoryIdEffect(this.selectedId$);
    }
}

const initializeState: CategoryListState = {
    selectedId: null,
    categories: [],
    limit: 10,
    errors: {},
    status: "idle"
}