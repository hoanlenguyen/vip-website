import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { VIPInputDirective } from "./vip-input-directive.directive";

@NgModule({
    imports: [CommonModule],
    declarations: [VIPInputDirective],
    exports: [VIPInputDirective]
})
export class VIPInputDirectiveModule {}