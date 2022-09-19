import { ChangeDetectionStrategy, Component } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { VIPForgetPasswordStore } from "./store/forget-password.store";

@Component({
    selector: 'vip-forget-password',
    templateUrl: './forget-password.component.html',
    styleUrls: ['./forget-password.component.scss'],
    providers: [VIPForgetPasswordStore],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class VIPForgetPasswordComponent {

    readonly vm$ = this._store.vm$

    readonly form = this._fb.nonNullable.group({
        username: ['', Validators.required]
    });

    constructor(
        private readonly _fb: FormBuilder,
        private readonly _store: VIPForgetPasswordStore
    ) {}

    onSubmit() {
    }
}