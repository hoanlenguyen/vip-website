import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { VIPButtonModule } from "@shared-app/ui";
import { VIPTranslateModule } from "@shared-app/utils";
import { VIPLoginComponent } from "./login.component";
import { vipLoginRoutes } from "./login.routing";

const ANGULAR_MODULES = [
    CommonModule,
    ReactiveFormsModule
];

const VIP_MODULES = [
    VIPButtonModule,
    VIPTranslateModule.forChild(),
    vipLoginRoutes
];
@NgModule({
    imports: [
        ...ANGULAR_MODULES,
        ...VIP_MODULES
    ],
    declarations: [VIPLoginComponent],
    exports: [VIPLoginComponent]
})
export class VIPLoginModule {}