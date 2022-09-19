import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { vipCoreRoutes } from "./core.routing";

@NgModule({
    imports: [
        CommonModule, 
        vipCoreRoutes
    ],
})
export class VIPCoreModule {}