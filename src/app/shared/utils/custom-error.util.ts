import { ErrorHandler, Injectable, NgZone } from "@angular/core";
import { VIPAlerService } from "@shared-app/data-access/services";
import { TuiNotification } from "@taiga-ui/core";

@Injectable()
export class VIPCustomError implements ErrorHandler {

    constructor(
        private readonly _zone: NgZone,
        private readonly _alertService: VIPAlerService
    ) {}

    handleError(error: unknown) {
        this._zone.run(() => {
            console.warn(error);
            // this._alertService.showNotification({
            //     content: error as string,
            //     options: {
            //         label: 'Warning',
            //         status: TuiNotification.Warning
            //     }
            // })
        })
    }
}