import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { ComponentStore } from "@ngrx/component-store";
import { VIP_TOKEN, VIP_USER } from "@shared-app/data-access/constants";
import { User, UserLoginResponse } from "@shared-app/data-access/models";
import { VIPLocalStorageService } from "@shared-app/data-access/services";
import { filter, tap } from "rxjs";
import { AuthState } from "./auth.state";

@Injectable({ providedIn: 'root' })
export class VIPAuthStore extends ComponentStore<AuthState> {

    readonly user$ = this.select((state) => state.user);
    readonly status$ = this.select((state) => state.status);
    
    readonly username$ = this.select(
        this.user$.pipe(filter((user): user is User => !!user)),
        (user) => user.username
    );

    readonly isAuthenticated$ = this.select(
        this.status$.pipe(filter((status) => status !== 'idle')),
        (status) => status === 'authenticated',
        { debounce: true }
    );

    readonly vm$ = this.select(
        this.isAuthenticated$,
        this.user$,
        (isAuthenticated, user) => ({ isAuthenticated, user }),
        { debounce: true }
    );

    constructor(
        private readonly _localStorage: VIPLocalStorageService,
        private readonly _router: Router
    ) {
        super(initialAuthState);
        this._initializeEffect();
        this.saveUserEffect(this.user$)
    }

    private readonly _initializeEffect = this.effect((trigger$) =>
        trigger$.pipe(
            tap(() => {
                const currentUser = JSON.parse(this._localStorage.getItem(VIP_USER)) as User;
                if (!currentUser) {
                    this.patchState({ user: null, status: "unauthenticated" });
                    return;
                }
                this.patchState({ user: currentUser, status: "authenticated" });
            })
        )
    );

    readonly saveUserEffect = this.effect<User | null>((user$) => 
        user$.pipe(
            tap((user) => {
                if (user == null) {
                    this._localStorage.removeItem(VIP_USER);
                    this._localStorage.removeItem(VIP_TOKEN);
                } else {
                    this._localStorage.setItem(VIP_USER, JSON.stringify(user));
                    this._localStorage.setItem(VIP_TOKEN, user.token);
                }
            })
        )
    );

    readonly loginEffect = this.effect<UserLoginResponse>((trigger$) => 
        trigger$.pipe(
            tap((response) => {
                this.patchState({ 
                    user: { ...response.data.user_info, token: response.data.token }, 
                    status: "authenticated"
                });
                this._router.navigate(['/home']);
            })
        )
    );

    readonly logoutEffect = this.effect((trigger$) => 
        trigger$.pipe(
            tap(() => {
                this.patchState({ user: null, status: "unauthenticated" });
                this._localStorage.removeItem(VIP_USER);
                this._localStorage.removeItem(VIP_TOKEN);
                this._router.navigate(['/login']);
            })
        )
    );
}

const initialAuthState: AuthState = {
    user: null,
    status: 'idle',
};