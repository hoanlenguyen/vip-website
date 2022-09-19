import { ShoppingCart } from "@shared-app/data-access/models";

export interface CheckoutState {
    shippingDetail: ShippingDetail;
    grandTotal: number;
    shoppingCartList: ShoppingCart[];
}

export interface ShippingDetail {
    fullName: string;
    mobileNo: string;
    address1: string;
    address2: string;
    city: string;
    postCode: string;
    state: string;
    country: string;
}