import { Component, Input, ChangeDetectionStrategy, ViewEncapsulation, ElementRef, NgZone, OnInit } from "@angular/core";
import { fromEvent, map, takeUntil } from "rxjs";
import { DestroyUtil } from "@shared-app/utils";

@Component({
    selector: 'button[vip-button], button[vipButton]',
    template: `
        <ng-container *ngIf="vipStatus !== 'loading'; else loading">
            <ng-content></ng-content>    
        </ng-container>

        <ng-template #loading>
            <ng-container *ngIf="vipLoadingText">{{ vipLoadingText }}</ng-container>
            <vip-loading></vip-loading>
        </ng-template>
    `,
    styles: [
        `
            @mixin buttonType($background) {
                &.vip-btn-fill {
                    background-color: var($background);
                    color: white
                }
                &.vip-btn-outlined {
                    color: var($background);
                    border: 1px solid var($background);
                    &:hover:not([disabled]) {
                        color: white;
                        background-color: var($background);
                        border: 1px solid var($background);
                    }
                }
            }

            .vip-btn {
                @apply flex flex-row items-center py-2 px-4 gap-1 rounded-md font-poppins text-base;
                &-loading-text {
                    @apply font-medium;
                }
                &-fill {
                    &:hover {
                        @apply opacity-70;
                    }
                    &:disabled {
                        @apply disabled:cursor-not-allowed opacity-70;
                    }
                }
                &-outlined {
                    @apply bg-transparent;
                    &:disabled {
                        @apply disabled:cursor-not-allowed opacity-60;
                    }
                }
                &-primary-dark {
                    @include buttonType(--btn-primary-dark);
                }
                &-primary-cold {
                    @include buttonType(--btn-primary-cold);
                }
                &-secondary-dark {
                    @include buttonType(--btn-secondary-dark);
                }
                &-secondary-light {
                    @include buttonType(--btn-secondary-light);
                }
                &-danger {
                    @include buttonType(--btn-danger);
                }
                &-success {
                    @include buttonType(--btn-success);
                }
            }
        `
    ],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [ DestroyUtil ],
    host: {
        class: 'vip-btn',
        '[attr.disabled]': `disabled || null`,
        '[class.vip-btn-primary-dark]': `vipColor === 'primary-dark'`,
        '[class.vip-btn-primary-cold]': `vipColor === 'primary-cold'`,
        '[class.vip-btn-secondary-dark]': `vipColor === 'secondary-dark'`,
        '[class.vip-btn-secondary-light]': `vipColor === 'secondary-light'`,
        '[class.vip-btn-success]': `vipColor === 'success'`,
        '[class.vip-btn-danger]': `vipColor === 'danger'`,
        '[class.vip-btn-test]': `vipColor === 'test'`,
        '[class.vip-btn-fill]': `vipType === 'fill'`,
        '[class.vip-btn-outlined]': `vipType === 'outlined'`,
        '[class.vip-btn-loading-text]': `vipStatus === 'loading'`,
        '[class.animate-pulse]': `vipStatus === 'loading'`,
    }
})
export class VIPButtonComponent implements OnInit {
    @Input() vipColor: VIPButtonColor = 'primary-dark';
    @Input() vipType: VIPButtonType = 'fill';
    @Input() vipStatus: VIPButtonStatus = 'idle';
    @Input() vipLoadingText: string = '';
    @Input() disabled: boolean = false;

    constructor(
        private _ngZone: NgZone,
        private _elementRef: ElementRef,
        private _destroy$: DestroyUtil
    ) { }

    ngOnInit(): void {
        this._ngZone.runOutsideAngular(() => {
            fromEvent<MouseEvent>(this._elementRef.nativeElement, "click").pipe(
                map((event) => {
                    if (this.disabled || this.vipStatus === 'loading') {
                        event.preventDefault();
                        event.stopImmediatePropagation();
                    }
                }),
                takeUntil(this._destroy$)
            ).subscribe()
        })
    }
}

export type VIPButtonType = "fill" | "outlined";

export type VIPButtonColor = "primary-dark" | "primary-cold" | "secondary-dark" | "secondary-light" | "success" | "danger" | "transparent";

export type VIPButtonStatus = "idle" | "loading" | "success" | "error";

