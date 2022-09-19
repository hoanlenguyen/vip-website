import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VIPButtonComponent } from './vip-button.component';
import { VIPLoadingModule } from '../vip-loading/vip-loading.module';

@NgModule({
    imports: [CommonModule, VIPLoadingModule],
    declarations: [VIPButtonComponent],
    exports: [VIPButtonComponent]
})
export class VIPButtonModule {}