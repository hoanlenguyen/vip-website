import { Injectable } from "@angular/core";
import { VIPCartStore } from "@app-core/store";
import { ComponentStore } from "@ngrx/component-store";
import { calculateGrandTotal } from "@shared-app/utils/calculate-grand-total.util";
import { map, tap, withLatestFrom } from "rxjs";
import { CheckoutState, ShippingDetail } from "./checkout.state";

@Injectable()
export class VIPCheckoutStore extends ComponentStore<CheckoutState> {

    readonly carts$ = this._cart.vm$.pipe(map((state) => state.shoppingCarts));
    readonly grandTotal$ = this.select((state) => state.grandTotal);
    readonly shippingDetail$ = this.select((state) => state.shippingDetail);
    readonly shoppingCartList$ = this.select((state) => state.shoppingCartList);

    readonly vm$ = this.select(
        this.shippingDetail$,
        this.carts$,
        this.grandTotal$,
        this.shoppingCartList$,
        (shippingDetail, carts, grandTotal, shoppingCartList) => ({ shippingDetail, carts, grandTotal, shoppingCartList })
    );

    constructor(
        private _cart: VIPCartStore
    ) {
        super(initialCheckoutState);
        this.initializeEffect();
    }

    readonly initializeEffect = this.effect((trigger$) =>
        trigger$.pipe(
            withLatestFrom(this.carts$),
            tap(([_, carts]) => {
                const shoppingCartListMap = carts.map(shoppingCart => {
                    return {
                        ...shoppingCart,
                        subTotal: shoppingCart.quantity * (+shoppingCart.product.cost),
                    }
                });
                this.patchState({ shoppingCartList: shoppingCartListMap, grandTotal: calculateGrandTotal(shoppingCartListMap) });
            })
        )
    );

    readonly setShippingDetail = this.effect<ShippingDetail>((shippingDetail$) =>
        shippingDetail$.pipe(
            tap((shippingDetail) => {
                this.patchState({ shippingDetail });
            })));

    readonly saveInfoCheckout = this.effect((trigger$) =>
        trigger$.pipe(
            withLatestFrom(this.shippingDetail$),
            tap(([_, shippingDetail]) => {
                //TODO: Call Api save info
                console.log('shippingDetail', shippingDetail)
            })))
}

const initialCheckoutState: CheckoutState = {
    shippingDetail: {
        fullName: '',
        mobileNo: '',
        address1: '',
        address2: '',
        city: '',
        postCode: '',
        state: '',
        country: ''
    },
    grandTotal: 0,
    shoppingCartList: []
};