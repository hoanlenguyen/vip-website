import { Directive, EventEmitter, Input, Output } from "@angular/core";

@Directive({
    selector: `[vip-first-selected]`,
    host: {
        "(click)": "onSelect()"
    }
})
export class VIPFirstSelectDirective {

    @Input()
    public selectValue!: unknown;

    @Input()
    public isFirst: boolean = false;

    @Output()
    public selectValueChange = new EventEmitter<unknown>();
    
    ngOnInit(): void {
        if (!this.isFirst) {
            return;
        }        
        this.selectValueChange.emit(this.selectValue);
    }

    onSelect(): void {
        this.selectValueChange.emit(this.selectValue);
    }
}