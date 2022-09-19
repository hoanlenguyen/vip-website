import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
    selector: 'vip-pagination',
    template: `
        <tui-pagination
            [length]="totalPage"
            [index]="currentPage == 0 ? 0 : currentPage - 1"
            (indexChange)="goToPage($event)"
        ></tui-pagination>
    `,
    styles: [],
    host: {
        class: "vip-pagination"
    },
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class VIPPaginationComponent {

    @Input()
    public totalPage!: number;

    @Input()
    public currentPage!: number;

    @Output()
    public indexChange = new EventEmitter<number>()

    goToPage(event: number): void {
        this.indexChange.emit(event);
    }
}