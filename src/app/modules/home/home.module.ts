import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { VIPButtonModule } from "@shared-app/ui";
import { VIPHomeComponent } from "./home.component";
import { vipHomeRoutes } from "./home.routing";
import { VIPCategoryListModule } from "./modules/category-list/category-list.module";
import { VIPProductListModule } from "./modules/product-list/product-list.module";

const ANGULAR_MODULES = [
    CommonModule,
    ReactiveFormsModule
];

const VIP_MODULES = [
    VIPProductListModule,
    VIPCategoryListModule,
    VIPButtonModule,
    vipHomeRoutes
];
@NgModule({
    imports: [
        ...ANGULAR_MODULES,
        ...VIP_MODULES
    ],
    declarations: [VIPHomeComponent],
    exports: [VIPHomeComponent]
})
export class VIPHomeModule {}