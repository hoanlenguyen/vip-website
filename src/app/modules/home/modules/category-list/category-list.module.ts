import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { VIPButtonModule, VIPLoadingModule } from "@shared-app/ui";
import { VIPFirstSelectModule } from "@shared-app/ui/directives";
import { VIPTranslateModule } from '@shared-app/utils';
import { VIPCategoryListComponent } from "./category-list.component";

const ANGULAR_MODULES = [
    CommonModule,
];

const VIP_MODULES = [
    VIPButtonModule,
    VIPLoadingModule,
    VIPFirstSelectModule,
    VIPTranslateModule.forChild(),
]
@NgModule({
    imports: [
        ...ANGULAR_MODULES,
        ...VIP_MODULES
    ],
    declarations: [VIPCategoryListComponent],
    exports: [VIPCategoryListComponent]
})
export class VIPCategoryListModule {}