import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { VIPAuthStore, VIPCartStore } from "@app-core/store";
import { ComponentStore } from "@ngrx/component-store";
import { ShoppingCart } from "@shared-app/data-access/models";
import { calculateGrandTotal } from '@shared-app/utils/calculate-grand-total.util';
import { map, tap, withLatestFrom } from "rxjs";
import { ShoppingCartState } from "./shopping-cart.state";

@Injectable()
export class VIPShoppingCartStore extends ComponentStore<ShoppingCartState> {

    readonly shoppingCartList$ = this.select((state) => state.shoppingCartList);
    readonly grandTotal$ = this.select((state) => state.grandTotal);
    readonly status$ = this.select((state) => state.status);
    readonly erros$ = this.select((state) => state.errors);
    readonly carts$ = this._cart.vm$.pipe(map((state) => state.shoppingCarts));
    readonly isAuthenticated$ = this._authStore.vm$.pipe(map((auth) => auth.isAuthenticated));

    readonly vm$ = this.select(
        this.shoppingCartList$,
        this.grandTotal$,
        this.status$,
        this.erros$,
        this.isAuthenticated$,
        this.carts$,
        (shoppingCartList, grandTotal, status, erros, isAuthenticated, carts) => ({ shoppingCartList, grandTotal, status, erros, isAuthenticated, carts })
    );

    readonly continueShopping = this.effect((trigger$) =>
        trigger$.pipe(
            tap((_) => this._router.navigate(['/home']))
        )
    );

    readonly navigateToCheckout = this.effect((trigger$) => trigger$.pipe(
        withLatestFrom(this.isAuthenticated$),
        tap(([, isAuthenticated]) => {
            isAuthenticated ? this._router.navigate(['/checkout']) : this._router.navigate(['/login']);
        })
    ));

    readonly setQuantity = this.effect<{ quantity: number, idShoppingCart: string }>((shoppingCartChangeQuantity$) =>
        shoppingCartChangeQuantity$.pipe(
            withLatestFrom(this.shoppingCartList$),
            tap(([shoppingCartChangeQuantity, shoppingCartList]) => {
                const shoppingCartListMap = shoppingCartList.map(shoppingCart => {
                    return {
                        ...shoppingCart,
                        quantity: shoppingCart.id === shoppingCartChangeQuantity.idShoppingCart ? shoppingCartChangeQuantity.quantity : shoppingCart.quantity,
                        subTotal: shoppingCart.id === shoppingCartChangeQuantity.idShoppingCart ? shoppingCartChangeQuantity.quantity * (+shoppingCart.product.cost) : shoppingCart.subTotal,
                    }
                });
                this.patchState({ shoppingCartList: shoppingCartListMap, grandTotal: calculateGrandTotal(shoppingCartListMap) });
                this._cart.updateShoppingCarts([...shoppingCartListMap]);
            })
        ));

    readonly removeShoppingCartById = this.effect<string>(idShoppingCart$ => idShoppingCart$.pipe(
        withLatestFrom(this.shoppingCartList$),
        tap(([idShoppingCart, shoppingCartList]) => {
            const itemIndex = shoppingCartList.findIndex(shoppingCart => shoppingCart.id === idShoppingCart);
            if (itemIndex <= -1) return;
            shoppingCartList.splice(itemIndex, 1);
            this.patchState({ shoppingCartList: shoppingCartList, grandTotal: calculateGrandTotal(shoppingCartList) });
            this._cart.updateShoppingCarts([...shoppingCartList]);
        })
    ));

    private readonly _initializeEffect = this.effect<ShoppingCart[]>((trigger$) =>
        trigger$.pipe(
            tap((carts) => {
                const tmpCarts = carts.map((cart) => {
                    return {
                        ...cart,
                        subTotal: cart.quantity * (+cart.product.cost),
                    }
                });
                this.patchState({ shoppingCartList: tmpCarts, grandTotal: calculateGrandTotal(tmpCarts) });
            })
        )
    );

    constructor(
        private readonly _authStore: VIPAuthStore,
        private readonly _router: Router,
        private readonly _cart: VIPCartStore
    ) {
        super(initializeState);
        this._initializeEffect(this.carts$);
    }
}

const initializeState: ShoppingCartState = {
    shoppingCartList: [],
    grandTotal: 0,
    errors: {},
    status: "idle"
}