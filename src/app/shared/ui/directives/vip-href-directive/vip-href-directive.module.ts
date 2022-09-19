import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { VIPHrefDirective } from "./vip-href-directive.directive";

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [VIPHrefDirective],
    exports: [VIPHrefDirective]
})
export class VIPHrefModule {}