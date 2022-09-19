import { Inject, Injectable } from "@angular/core";
import { ComponentStore } from "@ngrx/component-store";
import { TuiAlertService } from "@taiga-ui/core";
import { TuiAlertOptions } from '@taiga-ui/core/interfaces';
import { exhaustMap, switchMap, take, tap } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class VIPAlerService extends ComponentStore<{}>{

    constructor(
        @Inject(TuiAlertService)
        private readonly alertService: TuiAlertService,
    ) {
        super({})
    }
    
    readonly showNotification = this.effect<VIPAlertModal<unknown>>((trigger$) => 
        trigger$.pipe(
            exhaustMap((_) => this.alertService.open(_.content, { label: _.options.label, status: _.options.status, hasCloseButton: true })),
        )
    );

}

export interface VIPAlertModal<T> {
    content: string;
    options: Partial<TuiAlertOptions<T>>; 
} 