import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { VIPLanguageStoreService } from './store';

@Component({
    selector: 'vip-language',
    templateUrl: './language.component.html',
    styleUrls: ['./language.component.scss'],
    providers: [ VIPLanguageStoreService ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class VIPLanguageComponent {

    readonly vm$ = this._store.vm$;

    constructor(
        private _store: VIPLanguageStoreService
    ) {}
    
    changeLanguage(event: Event) {
        const value = +(event.target as HTMLSelectElement).value;
        this._store.changeLanguageEffect(value);
    }
}
