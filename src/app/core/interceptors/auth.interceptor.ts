import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HTTP_INTERCEPTORS } from "@angular/common/http";
import { Inject, Injectable, Provider } from "@angular/core";
import { VIP_LANG, VIP_TOKEN } from "@shared-app/data-access/constants";
import { VIPAlerService, VIPLocalStorageService } from "@shared-app/data-access/services";
import { AppConfig, APP_CONFIG } from "@shared-app/di";
import { TuiNotification } from "@taiga-ui/core";
import { catchError, Observable, throwError } from "rxjs";

@Injectable()
export class VIPAuthInterceptor implements HttpInterceptor {

    constructor(
        private readonly _localStorage: VIPLocalStorageService,
        private readonly _alertService: VIPAlerService,
        @Inject(APP_CONFIG) readonly _appConfig: AppConfig,
    ) {}

    intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
        // req = req.clone({ url: this._appConfig.baseUrl + req.url });
        const token = this._localStorage.getItem(VIP_TOKEN);
        const lang = this._localStorage.getItem(VIP_LANG);
        if (token) {
            req = req.clone({
                setHeaders: {
                    Authorization: `Bearer ${token}`,
                    lang: `${ lang }`
                }
            })
        }
        return next.handle(req).pipe(
            catchError((_) => {
                this._alertService.showNotification({
                    content: JSON.stringify(_.error.errors.message), options: { label: 'API Failed', status: TuiNotification.Error
                }});
                return throwError(() => {
                    return _;
                })
            })
        )
    }
}

export const provideAuthInterceptor: Provider = {
    provide: HTTP_INTERCEPTORS,
    useClass: VIPAuthInterceptor,
    multi: true
}