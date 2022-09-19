import { HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { VIPAuthStore } from "@app-core/store";
import { ComponentStore, tapResponse } from "@ngrx/component-store";
import { VIPAuthAPI } from "@shared-app/data-access/apis/auth.api";
import { UserFirstTimeLogin } from "@shared-app/data-access/models";
import { exhaustMap, pipe, tap } from "rxjs";
import { FirstTimeLoginState } from "./first-time-login.state";

@Injectable()
export class VIPFirstTimeLoginStore extends ComponentStore<FirstTimeLoginState> {

    readonly status$ = this.select((state) => state.status);
    readonly erros$ = this.select((state) => state.errors);

    readonly test$ = this._authStore.vm$;

    readonly vm$ = this.select(
        this.status$,
        this.erros$,
        (status, errors) => ({ status, errors })
    );

    readonly loginEffect = this.effect<UserFirstTimeLogin>(
        pipe(
            tap((_) => this.patchState({ status: "loading" })),
            exhaustMap((user) => this._authApi.firtTimeLogin(user).pipe(
                tapResponse(
                    (response) => {
                        if (!response.success) {
                            //TODO: Waiting for an API
                            return;
                        }
                        this._authStore.loginEffect(response);
                    },
                    ({ error }: HttpErrorResponse) => {
                        this.patchState({ errors: error?.errors || {}, status: "error" })
                    }
                )
            ))
        )
    )

    constructor(
        private readonly _authStore: VIPAuthStore,
        private readonly _authApi: VIPAuthAPI
    ) {
        super(initializeState)
    }
}

const initializeState: FirstTimeLoginState = {
    errors: {},
    status: "idle"
}