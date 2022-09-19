import { ChangeDetectionStrategy, Component } from "@angular/core";
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { VIPFirstTimeLoginStore } from "./store/first-time-login.store";

@Component({
    selector: 'vip-first-time-login',
    templateUrl: './first-time-login.component.html',
    styleUrls: ['./first-time-login.component.scss'],
    providers: [ VIPFirstTimeLoginStore ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class VIPFirstTimeLoginComponent {

    readonly vm$ = this._store.vm$

    readonly form = this._fb.nonNullable.group({
        username: ['', Validators.required],
        passwordGroup: this._fb.nonNullable.group({
            password: ['', Validators.required],
            confirmPassword:  ['', Validators.required]
        }, {
            validators: comparePassword
        }),
        securityCode: ['', Validators.required]
    });

    get passwordGroup(): FormGroup {
        return this.form.get('passwordGroup') as FormGroup
    }

    get username(): AbstractControl<string> {
        return this.form.get('username') as AbstractControl<string>
    }

    get password(): AbstractControl<string> {
        return (this.form.get('passwordGroup') as FormGroup).get('password') as AbstractControl<string>
    }

    get confirmPassword(): AbstractControl<string> {
        return (this.form.get('passwordGroup') as FormGroup).get('confirmPassword') as AbstractControl<string>
    }

    get securityCode(): AbstractControl<string> {
        return this.form.get('securityCode') as AbstractControl<string>
    }

    constructor(
        private readonly _fb: FormBuilder,
        private readonly _store: VIPFirstTimeLoginStore
    ) {}

    onSubmit(): void {
        const rawValue = {
            email: this.username.getRawValue(),
            password: this.password.getRawValue(),
            confirm_password: this.confirmPassword.getRawValue(),
            security_code: this.securityCode.getRawValue()
        }
        this._store.loginEffect(rawValue);
    }
}

export function comparePassword(c: AbstractControl) {
    const v = c.value;
    return (v.password === v.confirmPassword) ? null : {
        password_not_match: true
    }
}