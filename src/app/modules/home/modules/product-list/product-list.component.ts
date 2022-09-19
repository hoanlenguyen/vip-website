import { ChangeDetectionStrategy, Component } from "@angular/core";
import { Pagination, Product } from "@shared-app/data-access/models";
import { VIPProductListStore } from "./store/product-list.store";

@Component({
    selector: 'vip-product-list',
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.scss'],
    providers: [ VIPProductListStore ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class VIPProductListComponent {

    readonly vm$ = this._store.vm$;

    constructor(
        private readonly _store: VIPProductListStore,
    ) {}
    

    addToCart(product: Product): void {
        this._store.addProductToCartEffect(product);
    }

    onNavigate(productId: number): void {
        this._store.onNavigateEffect(productId);
    }

    fetchProducts(page: number, pagination: Pagination): void {
        this._store.changePageEffect({
            ...pagination,
            current_page: page + 1
        });
    }
}