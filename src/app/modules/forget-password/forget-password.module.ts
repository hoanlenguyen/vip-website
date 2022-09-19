import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { VIPButtonModule } from "@shared-app/ui";
import { VIPTranslateModule } from "@shared-app/utils";
import { VIPForgetPasswordComponent } from "./forget-password.component";
import { vipForgetPasswordRoutes } from "./forget-password.routing";

const ANGULAR_MODULES = [
    CommonModule,
    ReactiveFormsModule,
];

const VIP_MODULES = [
    VIPButtonModule,
    vipForgetPasswordRoutes,
    VIPTranslateModule.forChild()
]
@NgModule({
    imports: [
        ...ANGULAR_MODULES,
        ...VIP_MODULES
    ],
    declarations: [VIPForgetPasswordComponent],
    exports: [VIPForgetPasswordComponent]
})
export class VIPForgetPasswordModule {}