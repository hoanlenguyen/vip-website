import { DOCUMENT } from '@angular/common';
import { Directive, Inject, Input } from '@angular/core';

@Directive({
  selector: '[href]',
  host: {
    '(click)' : 'onClick($event)'
  }
})
export class VIPHrefDirective {
  constructor(
    @Inject(DOCUMENT) public document: Document
  ) {
  }
  @Input() public href: string | undefined;

  onClick(event: Event): void {
    if (this.href) {
      event.preventDefault();
    }
  }

}