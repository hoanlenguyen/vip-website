import { ChangeDetectionStrategy, Component } from "@angular/core";
import { VIPProductDetailStore } from "./store";

@Component({
    selector: 'vip-product-detail',
    templateUrl: './product-detail.component.html',
    styleUrls: ['./product-detail.component.scss'],
    providers: [ VIPProductDetailStore ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class VIPProductDetailComponent {

    readonly vm$ = this._store.vm$;

    constructor(
        private readonly _store: VIPProductDetailStore
    ) {}

    addToCart(productId: number): void {
        this._store.addProductToCartEffect(productId);
    }

    changeColor(color: string): void {
        this._store.changeColorEffect(color);
    }

    changeQuantity(quantity: string): void {
        this._store.changeQuantityEffect(+quantity);
    }

    nextId(): void {
        this._store.nextIdEffect();
    }

    prevId(): void {
        this._store.prevIdEffect();
    }

}