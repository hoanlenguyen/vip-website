import { ChangeDetectionStrategy, Component } from "@angular/core";
import { VIPHomeStore } from "./store/home.store";

@Component({
    selector: 'vip-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
    providers: [ VIPHomeStore ], 
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class VIPHomeComponent {

    readonly vm$ = this._store.vm$;
    
    constructor(
        private readonly _store: VIPHomeStore
    ) {}
}