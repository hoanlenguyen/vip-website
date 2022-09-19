import { ChangeDetectionStrategy, Component } from "@angular/core";
import { tap } from "rxjs";
import { VIPCategoryListStore } from "./store/category-list.store";

@Component({
    selector: 'vip-category-list',
    templateUrl: './category-list.component.html',
    styleUrls: ['./category-list.component.scss'],
    providers: [ VIPCategoryListStore ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class VIPCategoryListComponent {

    readonly vm$ = this._store.vm$;

    constructor(
        private readonly _store: VIPCategoryListStore
    ) {}

    onSelected(id: number): void {
        this._store.loadProductsByCategoryIdEffect(id);
    }
}