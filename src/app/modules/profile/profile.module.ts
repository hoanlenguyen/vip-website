import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { VIPProfileComponent } from "./profile.component";
import { vipProfileRoutes } from "./profile.routing";

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        vipProfileRoutes
    ],
    declarations: [VIPProfileComponent],
    exports: [VIPProfileComponent]
})
export class VIPProfileModule {}