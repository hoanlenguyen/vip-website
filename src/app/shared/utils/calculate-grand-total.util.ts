import { ShoppingCart } from "@shared-app/data-access/models";

export function calculateGrandTotal(shoppingCartList: ShoppingCart[]) {
    let grandTotal = 0;
    shoppingCartList.forEach(shoppingCart => {
        grandTotal += shoppingCart.subTotal;
    });
    return grandTotal;
}
