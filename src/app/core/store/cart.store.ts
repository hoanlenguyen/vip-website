import { HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ComponentStore, tapResponse } from "@ngrx/component-store";
import { VIPProductAPI } from "@shared-app/data-access/apis";
import { VIP_SHOPPING_CART, VIP_USER } from "@shared-app/data-access/constants";
import { Product, ProductInCart, ShoppingCart } from "@shared-app/data-access/models";
import { VIPAlerService, VIPLocalStorageService } from "@shared-app/data-access/services";
import { TuiNotification } from "@taiga-ui/core";
import { defer, exhaustMap, map, of, tap, withLatestFrom } from "rxjs";
import { v4 as uuidv4 } from 'uuid';
import { CartState } from "./cart.state";

@Injectable({
    providedIn: 'root'
})
export class VIPCartStore extends ComponentStore<CartState> {

    readonly products$ = this.select((state) => state.products);
    readonly shoppingCarts$ = this.select((state) => state.shoppingCarts);
    readonly status$ = this.select((state) => state.status);
    readonly erros$ = this.select((state) => state.errors);

    readonly vm$ = this.select(
        this.products$,
        this.shoppingCarts$,
        this.status$,
        this.erros$,
        (products, shoppingCarts, status, error) => ({ products, shoppingCarts, status, error }),
        { debounce: true }
    );

    private readonly _initializeEffect = this.effect<void>(trigger$ =>
        trigger$.pipe(
            tap((_) => this.patchState({ status: "loading" })),
            exhaustMap(() =>
                defer(() => {
                    const productsInCart = this._localStorage.getItem(VIP_SHOPPING_CART);
                    const user = this._localStorage.getItem(VIP_USER);
                    if (!productsInCart || !user) {
                        return of(null);
                    };
                    const products = JSON.parse(productsInCart) as ProductInCart[];
                    const productIds = products.map((product) => product.productId);
                    this.patchState({ products });
                    return this._productApi.getProductsByProductIds(productIds);
                }).pipe(
                    withLatestFrom(this.products$),
                    tapResponse(
                        ([response, products]) => {
                            if (!response) {
                                return;
                            };
                            const shoppingCarts = products.map((product) => {
                                const tmpCart: ShoppingCart = {
                                    product: response.data.products.find((_) => _.id === product.productId) || ({} as Product),
                                    id: product.cartId,
                                    quantity: product.quantity,
                                    color: product.subInformations["color"] as string,
                                    subTotal: 0
                                }
                                return tmpCart;
                            });
                            this.patchState({ shoppingCarts, status: "success" });
                        },
                        ({ error }: HttpErrorResponse) => {
                            this.patchState({ errors: error?.errors || {}, status: "error" });
                        }
                    )
                )
            )
        )
    );

    private _refesh(): void {
        this._initializeEffect();
    }

    readonly addProductToCartEffect = this.effect<Omit<ProductInCart, 'cartId'>>((trigger$) =>
        trigger$.pipe(
            withLatestFrom(this.products$, this.status$),
            map(([product, products, status]) => {
                const tmpProduct = products
                    .filter((_product) => _product.productId === product.productId && _product.subInformations["color"] === product.subInformations["color"])
                    .map((_product) => ({ ..._product, quantity: product.quantity + _product.quantity }))[0];
                if (!tmpProduct) {
                    this.patchState({ products: [{ ...product, cartId: uuidv4() }, ...products] });
                    this._refesh();
                    return status;
                }
                products = products.filter((_product) => _product.cartId !== tmpProduct.cartId);
                this.patchState({ products: [tmpProduct, ...products] });
                this._refesh();
                return status;
            }),
            tap((status) => {
                if (!status || status !== "success") {
                    return;
                }
                this._alerService.showNotification({
                    content: 'Add successfuly',
                    options: {
                        label: 'Add to Cart', status: TuiNotification.Success
                    }
                });
            })
        )
    );

    readonly saveProductsEffect = this.effect<ProductInCart[]>((trigger$) =>
        trigger$.pipe(
            tap((products) => {
                if (products.length === 0) {
                    this._localStorage.removeItem(VIP_SHOPPING_CART);
                    return;
                }
                this._localStorage.setItem(VIP_SHOPPING_CART, JSON.stringify(products));
                this.patchState({ products });
            })
        )
    );

    readonly updateShoppingCarts = this.effect<ShoppingCart[]>((trigger$) =>
        trigger$.pipe(
            tap((shoppingCarts) => {
                const products = shoppingCarts.map(shoppingCart => {
                    return {
                        cartId: shoppingCart.id,
                        productId: shoppingCart.product.id,
                        quantity: shoppingCart.quantity,
                        subInformations: {
                            color: shoppingCart['color'],
                        }
                    };
                });
                this.patchState({ products, shoppingCarts })
            })
        )
    );

    constructor(
        private readonly _alerService: VIPAlerService,
        private readonly _productApi: VIPProductAPI,
        private readonly _localStorage: VIPLocalStorageService,
    ) {
        super(initialAuthState);
        this._initializeEffect();
        this.saveProductsEffect(this.products$);
    }
}

const initialAuthState: CartState = {
    shoppingCarts: [],
    products: [],
    errors: {},
    status: "idle"
};

export function objectKey<T extends Object>(value: T): (keyof T)[] {
    return Object.keys(value) as (keyof T)[]
}
