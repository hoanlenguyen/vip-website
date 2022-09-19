import { Injectable } from "@angular/core";
import { CanActivate, CanActivateChild, CanLoad, Router, UrlTree } from "@angular/router";
import { VIPAuthStore } from "@app-core/store";
import { map, Observable, take } from "rxjs";

@Injectable({ providedIn: 'root' })
export class VIPAuthGuard implements CanLoad, CanActivate, CanActivateChild {

    constructor(
        private readonly _router: Router,
        private readonly _authStore: VIPAuthStore
    ) {
    }

    canLoad(): Observable<boolean | UrlTree> {
        return this._isAuth$();;
    }

    canActivate(): Observable<boolean | UrlTree> {
        return this._isAuth$();
    }

    canActivateChild(): Observable<boolean | UrlTree> {
        return this._isAuth$();
    }

    private _isAuth$() {
        return this._authStore.isAuthenticated$.pipe(
            map((isAuthenticated) => {
                return isAuthenticated || this._router.parseUrl('/');
            }),
            take(1)
        )
    }
}