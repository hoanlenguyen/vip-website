import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { VIPButtonModule } from "@shared-app/ui";
import { VIPHrefModule, VIPFirstSelectModule } from "@shared-app/ui/directives";
import { VIPProductDetailComponent } from "./product-detail.component";
import { vipProductDetailRoutes } from "./product-detail.routing";

const ANGULAR_MODULES = [
    CommonModule,
    FormsModule
];

const VIP_MODULES = [
    VIPButtonModule,
    VIPHrefModule,
    VIPFirstSelectModule,
    vipProductDetailRoutes
]
@NgModule({
    imports: [
        ...ANGULAR_MODULES,
        ...VIP_MODULES
    ],
    declarations: [VIPProductDetailComponent],
    exports: [VIPProductDetailComponent]
})
export class VIPProductDetailModule {}