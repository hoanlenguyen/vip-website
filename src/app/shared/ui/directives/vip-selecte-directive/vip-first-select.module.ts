import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { VIPFirstSelectDirective } from "./vip-first-select.directive";

@NgModule({
    imports: [ CommonModule ],
    declarations: [ VIPFirstSelectDirective ],
    exports: [ VIPFirstSelectDirective ]
})
export class VIPFirstSelectModule {}