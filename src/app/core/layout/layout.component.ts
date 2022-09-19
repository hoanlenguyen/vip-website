
import { ChangeDetectionStrategy, Component, ElementRef, ViewChild } from "@angular/core";

@Component({
    selector: 'vip-layout',
    templateUrl: './layout.component.html',
    styleUrls: ['./layout.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class VIPLayoutComponent {

    @ViewChild('header', { read: ElementRef })
    readonly headerWrapper!: ElementRef<HTMLElement>;

    headerHeight: string = '0px';

    ngAfterViewInit(): void {
        setTimeout(() => {
            this.headerHeight = this.headerWrapper.nativeElement.offsetHeight + 'px';
        });
    }
}