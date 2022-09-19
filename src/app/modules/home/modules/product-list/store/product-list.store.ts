import { HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { VIPCartStore } from "@app-core/store";
import { VIPHomeStore } from "@app-modules/home/store";
import { ComponentStore, tapResponse } from "@ngrx/component-store";
import { VIPProductAPI } from "@shared-app/data-access/apis/product.api";
import { Pagination, Product, ProductInCart } from "@shared-app/data-access/models";
import { debounceTime, defer, exhaustMap, map, of, tap, withLatestFrom } from "rxjs";
import { ProductListState } from "./product-list.state";

@Injectable()
export class VIPProductListStore extends ComponentStore<ProductListState> {

    readonly products$ = this.select((state) => state.products);
    readonly pagination$ = this.select((state) => state.pagination);
    readonly status$ = this.select((state) => state.status);
    readonly erros$ = this.select((state) => state.errors);
    readonly categoryIds$ = this._homeStore.vm$.pipe(map(vm => vm.categoryIds));

    readonly vm$ = this.select(
        this.status$,
        this.erros$,
        this.products$,
        this.pagination$,
        (status, errors, products, pagination) => ({ status, errors, products, pagination }),
        { debounce: true }
    );

    private readonly _initializeEffect = this.effect<any>((trigger$) => 
        trigger$.pipe(
            tap((_) => this.patchState({ products: [], status: "loading" })),
            debounceTime(100),
            withLatestFrom(this.pagination$),
            exhaustMap(([categoryIds, pagination]) => 
                defer(() => {
                    return categoryIds.length === 0 ? of(null) : this._productApi.getProductsByCategoryIds(categoryIds, pagination.current_page);
                }).pipe(
                    tapResponse(
                        (response) => {
                            if (!response || !response.success || response.data.products.length === 0) {

                                return;
                            }
                            this.patchState({ 
                                products: response.data.products, 
                                pagination:  response.data.pagination,
                                status: 'success' 
                            });
                        },
                        ({ error }: HttpErrorResponse) => {
                            this.patchState({ errors: error?.errors || {}, status: "error" });
                        }
                    )
                )
            )
        )
    );

    private readonly _refesh = () => {
        this._initializeEffect(this.categoryIds$);
    };

    readonly changePageEffect = this.effect<Pagination>((trigger$) => 
        trigger$.pipe(
            tap((pagination) => {
                this.patchState({ pagination });
                this._refesh();
            })
        )
    );

    readonly onNavigateEffect = this.effect<number>((trigger$) => 
        trigger$.pipe(
            tap((productId) => this._router.navigate([`product/${ productId }`]))
        )
    );

    readonly addProductToCartEffect = this.effect<Product>((trigger$) => 
        trigger$.pipe(
            tap((product) => {
                const tmpProduct = {
                    productId: product.id,
                    quantity: 1,
                    subInformations: {
                        "color": product.variants[0] || ''
                    }
                } as Omit<ProductInCart, 'cartId'>;
                this._cartStore.addProductToCartEffect(tmpProduct);
            })
        )
    )

    constructor(
        private readonly _cartStore: VIPCartStore,
        private readonly _homeStore: VIPHomeStore,
        private readonly _router: Router,
        private readonly _productApi: VIPProductAPI,
    ) {
        super(initializeState);
        this._initializeEffect(this.categoryIds$);
    };
}

const initializeState: ProductListState = {
    products: [],
    pagination: {
        current_page: 1,
        per_page: 10,
        total: 1,
        total_pages: 1,
        count: 1
    },
    errors: {},
    status: "idle",
}