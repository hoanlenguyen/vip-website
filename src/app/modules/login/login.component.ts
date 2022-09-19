import { ChangeDetectionStrategy, Component } from "@angular/core";
import { AbstractControl, FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { VIPLoginStore } from "./store/login.store";

@Component({
    selector: 'vip-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    providers: [VIPLoginStore],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class VIPLoginComponent {

    readonly vm$ = this._store.vm$;

    readonly form = this._fb.nonNullable.group({
        username: ['', Validators.required],
        password: ['', Validators.required]
    });

    get username(): AbstractControl<string> {
        return this.form.get('username') as AbstractControl<string>
    }

    get password(): AbstractControl<string> {
        return this.form.get('password') as AbstractControl<string>
    }
    
    constructor(
        private readonly _fb: FormBuilder,
        private readonly _store: VIPLoginStore,
        private readonly _router: Router
    ) {}

    onSubmit(): void {
        const dto = {
            email: this.username.getRawValue(),
            password: this.password.getRawValue()
        }
        this._store.loginEffect(dto);
    }

    onNavigate(url: string): void {
        this._router.navigate([`/${ url }`])
    }
}