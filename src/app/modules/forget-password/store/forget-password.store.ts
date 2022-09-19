import { Injectable } from "@angular/core";
import { ComponentStore } from "@ngrx/component-store";
import { ForgetPasswordState } from "./forget-password.state";

@Injectable()
export class VIPForgetPasswordStore extends ComponentStore<ForgetPasswordState> {

    readonly status$ = this.select((state) => state.status);
    readonly erros$ = this.select((state) => state.errors);

    readonly vm$ = this.select(
        this.status$,
        this.erros$,
        (status, errors) => ({ status, errors })
    );

    constructor(
        
    ) {
        super(initializeState)
    }
}

const initializeState: ForgetPasswordState = {
    errors: {},
    status: "idle"
}