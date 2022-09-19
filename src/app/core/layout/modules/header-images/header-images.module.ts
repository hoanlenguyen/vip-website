import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { VIPButtonModule } from "@shared-app/ui";
import { VIPHeaderImagesComponent } from "./header-images.component";

const ANGULAR_MODULES = [
    CommonModule, 
];

const VIP_MODULES = [
    VIPButtonModule
];
@NgModule({
    imports: [
        ...ANGULAR_MODULES,
        ...VIP_MODULES
    ],
    declarations: [VIPHeaderImagesComponent],
    exports: [VIPHeaderImagesComponent],
})
export class VIPHeaderImagesModule {}