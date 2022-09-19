import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { VIPShoppingCartStore } from "./store";

@Component({
    selector: 'vip-shopping-cart',
    templateUrl: './shopping-cart.component.html',
    styleUrls: ['./shopping-cart.component.scss'],
    providers: [VIPShoppingCartStore],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VIPShoppingCartComponent implements OnInit {

    readonly vm$ = this._store.vm$;

    public form!: FormGroup;

    constructor(
        private readonly _store: VIPShoppingCartStore,
        private readonly _fb: FormBuilder
    ) {
    }

    ngOnInit(): void {
        this._initForm();
    }

    private _initForm(): void {
        this.form = this._fb.group({
            quantity: [0]
        })
    }

    onClickContinueShopping() {
        this._store.continueShopping();
    }

    onClickCheckout() {
        this._store.navigateToCheckout();
    }

    changeQuantity(quantity: number, idShoppingCart: string) {
        this._store.setQuantity({ quantity, idShoppingCart });
    }

    inputChange(quantityEvent: any, idShoppingCart: string) {
        this._store.setQuantity({ quantity: quantityEvent.target.value, idShoppingCart })
    }

    removeShoppingCartItem(idShoppingCart: string) {
        this._store.removeShoppingCartById(idShoppingCart);
    }
}