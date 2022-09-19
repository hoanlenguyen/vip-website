import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { VIPHeaderStoreService } from '@app-core/layout/modules/header/store';

@Component({
    selector: 'vip-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
    providers: [ VIPHeaderStoreService ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VIPHeaderComponent implements OnInit {

    readonly vm$ = this._store.vm$;

    constructor(
        private readonly _store: VIPHeaderStoreService, 
        private readonly _router: Router,
    ) {}

    ngOnInit(): void {
        this._store.setMenuSelectedEffect(this._router.url);
    }

    onCartClick() {
        this._store.setMenuSelectedEffect('/shopping-cart');
        this._router.navigate(['/shopping-cart'])
    }

    onClickMenu(url: string) {
        this._store.setMenuSelectedEffect(url);
    }

    navigateToLogin() {
        this._store.setMenuSelectedEffect('/login');
        this._router.navigate(['/login'])
    }

    logOut() {
        this._store.logOutEffect()
    }
}
