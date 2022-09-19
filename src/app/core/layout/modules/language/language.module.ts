import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { VIPLanguageComponent } from './language.component';
@NgModule({
    declarations: [VIPLanguageComponent],
    imports: [ CommonModule, RouterModule],
    exports: [VIPLanguageComponent],
    providers: [],
})
export class VIPLanguageModule {}