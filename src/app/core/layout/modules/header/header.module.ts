import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { VIPButtonModule } from '@shared-app/ui';
import { VIPTranslateModule } from '@shared-app/utils';
import { VIPLanguageModule } from '../language/language.module';
import { VIPHeaderComponent } from './header.component';

export const ANGULAR_MODULES = [
    CommonModule,
    RouterModule
];

export const VIP_MODULES = [
    VIPButtonModule,
    VIPLanguageModule,
    VIPTranslateModule.forChild()
];
@NgModule({
    declarations: [VIPHeaderComponent],
    imports: [
        ...ANGULAR_MODULES,
        ...VIP_MODULES
    ],
    exports: [VIPHeaderComponent],
    providers: [],
})
export class VIPHeaderModule { }