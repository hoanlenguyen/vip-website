import { HttpClient } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { BEResponse, UserFirstTimeLogin, UserLogin, UserLoginResponse } from "@shared-app/data-access/models";
import { AppConfig, APP_CONFIG } from "@shared-app/di";
import { interval, map, Observable, of } from "rxjs";

@Injectable({ providedIn: 'root'})
export class VIPAuthAPI {

    constructor(
        private readonly _http: HttpClient,
        @Inject(APP_CONFIG) readonly _appConfig: AppConfig
    ) {}

    login(user: UserLogin): Observable<UserLoginResponse> {
        return this._http.post<UserLoginResponse>(this._appConfig.baseUrl + '/auth/login', user);
    }

    firtTimeLogin(user: UserFirstTimeLogin): Observable<UserLoginResponse> {
        return this._http.post<UserLoginResponse>(this._appConfig.baseUrl + '/auth/first-time-login', user);
    }
}
