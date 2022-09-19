import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { VIPButtonModule } from "@shared-app/ui";
import { VIPTranslateModule } from "@shared-app/utils";
import { VIPFirstTimeLoginComponent } from "./first-time-login.component";
import { vipFirstTimeLoginRoutes } from "./fist-time-login.routing";

const ANGULAR_MODULES = [
    CommonModule,
    ReactiveFormsModule,
];

const VIP_MODULES = [
    VIPButtonModule,
    vipFirstTimeLoginRoutes,
    VIPTranslateModule.forChild()
];
@NgModule({
    imports: [
        ...ANGULAR_MODULES,
        ...VIP_MODULES
    ],
    declarations: [VIPFirstTimeLoginComponent],
    exports: [VIPFirstTimeLoginComponent]
})
export class VIPFirstTimeLoginModule {}