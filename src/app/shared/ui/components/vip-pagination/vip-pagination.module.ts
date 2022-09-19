import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { TuiPaginationModule } from "@taiga-ui/kit";
import { VIPPaginationComponent } from "./vip-pagination.component";

@NgModule({
    imports: [
        CommonModule,
        TuiPaginationModule
    ],
    declarations: [ VIPPaginationComponent ],
    exports: [ VIPPaginationComponent ]
})
export class VIPPaginationModule {}