import { debounceTime } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { VIPCheckoutStore } from './store';

@Component({
    selector: 'vip-checkout',
    templateUrl: './checkout.component.html',
    styleUrls: ['./checkout.component.scss'],
    providers: [VIPCheckoutStore]
})
export class VIPCheckoutComponent implements OnInit {
    readonly vm$ = this._store.vm$;
    shippingDetailForm!: FormGroup;
    constructor(private _store: VIPCheckoutStore, private _fb: FormBuilder) { 
    }

    ngOnInit(): void { 
        this.shippingDetailForm = this._fb.group({
            fullName: [''],
            mobileNo: [''],
            address1: [''],
            address2: [''],
            city: [''],
            postCode: [''],
            state: [''],
            country: ['']
        });

        this._store.setShippingDetail(this.shippingDetailForm.valueChanges.pipe(debounceTime(1000)));
    }

    onClickRedeem() {
        this._store.saveInfoCheckout();
    }
}
