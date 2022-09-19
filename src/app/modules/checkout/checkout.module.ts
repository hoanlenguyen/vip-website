import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VIPCheckoutComponent } from './checkout.component';
import { vipCheckoutRoutes } from './checkout.routing';
import { VIPTranslateModule } from '@shared-app/utils';
import { VIPButtonModule } from '@shared-app/ui';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
    declarations: [VIPCheckoutComponent],
    imports: [
        CommonModule, 
        FormsModule,
        ReactiveFormsModule,
        vipCheckoutRoutes, 
        VIPButtonModule, 
        VIPTranslateModule.forChild()
    ],
    exports: [VIPCheckoutComponent],
    providers: [],
})
export class VIPCheckoutModule { }