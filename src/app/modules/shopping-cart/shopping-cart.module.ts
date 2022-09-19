import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { VIPButtonModule } from "@shared-app/ui";
import { VIPInputDirectiveModule } from "@shared-app/ui/directives";
import { VIPTranslateModule } from "@shared-app/utils";
import { VIPShoppingCartComponent } from "./shopping-cart.component";
import { vipShoppingCartRoutes } from "./shopping-cart.routing";

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        VIPButtonModule,
        VIPInputDirectiveModule,
        vipShoppingCartRoutes,
        VIPTranslateModule.forChild(),
    ],
    declarations: [VIPShoppingCartComponent],
    exports: [VIPShoppingCartComponent]
})
export class VIPShoppingCartModule {}