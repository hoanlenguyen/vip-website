import { NgModule } from '@angular/core';
import { VIPLoadingComponent } from './vip-loading.component';
import { CommonModule } from '@angular/common';

@NgModule({
    imports: [CommonModule],
    declarations: [VIPLoadingComponent],
    exports: [VIPLoadingComponent],
})
export class VIPLoadingModule {}