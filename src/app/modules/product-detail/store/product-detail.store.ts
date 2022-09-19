import { HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { VIPCartStore } from "@app-core/store";
import { ComponentStore, tapResponse } from "@ngrx/component-store";
import { VIPProductAPI } from "@shared-app/data-access/apis";
import { VIPAlerService } from "@shared-app/data-access/services";
import { debounceTime, filter, map, pluck, switchMap, tap, withLatestFrom } from "rxjs/operators";
import { ProductDetailState } from "./product-detail.state";

@Injectable()
export class VIPProductDetailStore extends ComponentStore<ProductDetailState> {

    readonly product$ = this.select((state) => state.product);
    readonly productId$ = this.select((state) => state.productId);
    readonly selectedColor$ = this.select((state) => state.selectedColor);
    readonly selectedQuantity$ = this.select((state) => state.selectedQuantity);
    readonly error$ = this.select((state) => state.errors);
    readonly status$ = this.select((state) => state.status);
    readonly cartStatus$ = this._cartStore.vm$.pipe(map((vm) => vm.status));

    readonly vm$ = this.select(
        this.product$,
        this.error$,
        this.status$,
        this.selectedColor$,
        (product, error, status, selectedColor) => ({ product, error, status, selectedColor })
    );

    private readonly _fetchProductEffect = this.effect<string>((id$) =>
        id$.pipe(
            tap((id: string) => {
                this.patchState({ productId: Number(id), product: null })
            }),
            switchMap((id: string) =>
                this._productApi.getProductById(id).pipe(
                    tapResponse(
                        (response) => {
                            if (!response.success) {
                                //TODO: Waiting for an API
                                return;
                            }
                            this.patchState({ 
                                product: response.data, status: 'success', 
                                selectedColor: response.data.variants[0] || ''
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

    readonly changeColorEffect = this.effect<string>((trigger$) =>
        trigger$.pipe(
            tap((selectedColor) => this.patchState({ selectedColor }))
        )
    );

    readonly changeQuantityEffect = this.effect<number>((trigger$) =>
        trigger$.pipe(
            debounceTime(200),
            tap((selectedQuantity) => this.patchState({ selectedQuantity }))
        )
    );

    //TODO: Ready for furture feature
    readonly nextIdEffect = this.effect((trigger$) =>
        trigger$.pipe(
            withLatestFrom(this.productId$),
            switchMap(([, id]) => this._router.navigate(['/product', id + 1]))
        )
    );

    //TODO: Ready for furture feature
    readonly prevIdEffect = this.effect(trigger$ =>
        trigger$.pipe(
            withLatestFrom(this.productId$),
            switchMap(([, id]) => this._router.navigate(['/product', id - 1]))
        )
    );

    readonly addProductToCartEffect = this.effect<number>((trigger$) =>
        trigger$.pipe(
            withLatestFrom(this.selectedColor$, this.selectedQuantity$),
            tap(([productId, selectedColor, selectedQuantity]) => {
                this._cartStore.addProductToCartEffect({
                    productId: productId,
                    quantity: selectedQuantity,
                    subInformations: {
                        'color': selectedColor
                    }
                });
            }),
        )
    );

    constructor(
        private readonly _cartStore: VIPCartStore,
        private readonly _productApi: VIPProductAPI,
        private readonly _router: Router,
        private readonly _route: ActivatedRoute,
    ) {
        super(initializeState);
        this._fetchProductEffect(
            this._route.params.pipe(
                pluck('id'),
                filter(id => !!id)
            )
        )
    }

}

const initializeState: ProductDetailState = {
    product: null,
    productId: 0,
    selectedQuantity: 1,
    selectedColor: '',
    errors: {},
    status: "idle"
}