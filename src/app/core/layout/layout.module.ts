import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { VIPLayoutComponent } from "./layout.component";
import { vipLayoutRoutes } from "./layout.routing";
import { VIPFooterModule } from "./modules/footer/footer.module";
import { VIPHeaderImagesModule } from "./modules/header-images/header-images.module";
import { VIPHeaderModule } from "./modules/header/header.module";

const ANGULAR_MODULES = [
    CommonModule
];

const VIP_MODULES = [
    VIPHeaderModule,
    VIPFooterModule,
    VIPHeaderImagesModule,
    vipLayoutRoutes
];
@NgModule({
    imports: [
        ...ANGULAR_MODULES,
        ...VIP_MODULES
    ],
    declarations: [VIPLayoutComponent],
    exports: [VIPLayoutComponent],
})
export class VIPLayoutModule {}