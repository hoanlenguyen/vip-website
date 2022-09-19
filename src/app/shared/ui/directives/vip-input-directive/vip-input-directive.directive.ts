import { Directive, ElementRef, Input } from '@angular/core';

@Directive({
    selector: 'input[vip-input]',
})
export class VIPInputDirective {
    constructor(
        private readonly _elementRef: ElementRef
    ) {
    }

    @Input() public inputValue: unknown;

    ngOnInit(): void {
        this._elementRef.nativeElement.value = this.inputValue;
    }

}