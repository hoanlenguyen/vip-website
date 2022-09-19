import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { VIPNotAuthComponent } from "./not-auth.component";
import { vipNotAuthRoutes } from "./not-auth.routing";

@NgModule({
    imports: [
        CommonModule,
        vipNotAuthRoutes
    ],
    declarations: [VIPNotAuthComponent],
    exports: [VIPNotAuthComponent],
})
export class VIPNotAuthModule {}