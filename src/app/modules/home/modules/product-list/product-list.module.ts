import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { VIPButtonModule, VIPLoadingModule } from "@shared-app/ui";
import { VIPPaginationModule } from "@shared-app/ui/components/vip-pagination/vip-pagination.module";
import { VIPProductListComponent } from "./product-list.component";

const ANGULAR_MODULES = [
    CommonModule
];

const VIP_MODULES = [
    VIPButtonModule,
    VIPLoadingModule,
    VIPPaginationModule
];

@NgModule({
    imports: [
        ...ANGULAR_MODULES,
        ...VIP_MODULES,
    ],
    declarations: [ VIPProductListComponent ],
    exports: [ VIPProductListComponent ]
})
export class VIPProductListModule {}