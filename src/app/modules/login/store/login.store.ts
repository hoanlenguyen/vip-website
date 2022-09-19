import { HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { VIPAuthStore } from "@app-core/store";
import { ComponentStore, tapResponse } from "@ngrx/component-store";
import { VIPAuthAPI } from "@shared-app/data-access/apis/auth.api";
import { UserLogin } from "@shared-app/data-access/models";
import { VIPAlerService } from "@shared-app/data-access/services";
import { TuiNotification } from "@taiga-ui/core";
import { exhaustMap, map, pipe, tap } from "rxjs";
import { LoginState } from "./login.state";

@Injectable()
export class VIPLoginStore extends ComponentStore<LoginState> {

    readonly status$ = this.select((state) => state.status);
    readonly erros$ = this.select((state) => state.errors);

    readonly vm$ = this.select(
        this.status$,
        this.erros$,
        (status, errors) => ({ status, errors })
    );

    readonly loginEffect = this.effect<UserLogin>(
        pipe(
            tap((_) => this.patchState({ status: "loading" })),
            exhaustMap((user) => this._authApi.login(user).pipe(
                tapResponse(
                    (response) => {
                        if (!response.success) {
                            //TODO: Waiting for an API
                            return;
                        }
                        this._alertService.showNotification({
                            content: JSON.stringify(`Welcome, ` + response.data.user_info.full_name),
                            options: {
                                label: response.message, status: TuiNotification.Success
                            }
                        });
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
        private readonly _authApi: VIPAuthAPI,
        private readonly _alertService: VIPAlerService,

    ) {
        super(initializeState)
    }
}

const initializeState: LoginState = {
    errors: {},
    status: "idle"
}