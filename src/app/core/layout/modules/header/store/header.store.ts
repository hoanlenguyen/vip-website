import { Injectable } from '@angular/core';
import { MENU_LIST } from '@app-core/layout/layout.constant';
import { VIPAuthStore, VIPCartStore } from '@app-core/store';
import { ComponentStore } from '@ngrx/component-store';
import { map, tap, withLatestFrom } from 'rxjs';
import { HeaderState, Menu } from './header.state';

@Injectable()
export class VIPHeaderStoreService extends ComponentStore<HeaderState> {

    readonly amount$ = this._cartStore.vm$.pipe(map(vm => vm.products.length));
    readonly isAuthenticated$ = this._authStore.vm$.pipe(map(auth => auth.isAuthenticated));
    readonly user$ = this._authStore.vm$.pipe(map(auth => auth.user));
    readonly menuList$ = this.select((state) => state.menuList);

    readonly vm$ = this.select(
        this.user$,
        this.menuList$,
        this.isAuthenticated$,
        this.amount$,
        (user, menuList, isAuthenticated, amount) => ({ user, menuList, isAuthenticated, amount })
    );

    private readonly _initialize = this.effect<Menu[]>(trigger$ => trigger$.pipe(
        tap((menuList) => this.patchState({ menuList }))
    ))

    setMenuSelectedEffect = this.effect<string>((trigger$) =>
        trigger$.pipe(
            withLatestFrom(this.menuList$),
            tap(([selectedMenu, menuList]) => {
                menuList = menuList.map((menu) => {
                    return {
                        ...menu,
                        isSelect: selectedMenu === menu.url
                    }
                });
                this.patchState({ menuList });
            }),
        )
    );
    

    logOutEffect = this.effect((trigger$) => trigger$.pipe(
        tap((_) => this._authStore.logoutEffect())
    ));

    constructor(
        private readonly _authStore: VIPAuthStore,
        private readonly _cartStore: VIPCartStore
    ) {
        super(initialHeaderState);
        this._initialize(this.menuList$);
    }

}

export const initialHeaderState: HeaderState = {
    menuList: [
        ...MENU_LIST
    ]
};