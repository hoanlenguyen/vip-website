import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { TranslateModule } from "@ngx-translate/core";
import { VIPFooterComponent } from "./footer.component";

@NgModule({
    imports: [
        CommonModule,
        TranslateModule
    ],
    declarations: [VIPFooterComponent],
    exports: [VIPFooterComponent]
})
export class VIPFooterModule {}