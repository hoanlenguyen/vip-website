import { HttpClient } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { BEResponse, CategoryList } from "@shared-app/data-access/models";
import { AppConfig, APP_CONFIG } from "@shared-app/di";

import { Observable } from "rxjs";

@Injectable({ providedIn: 'root'})
export class VIPCategoryAPI {

    constructor(
        private readonly _http: HttpClient,
        @Inject(APP_CONFIG) readonly _appConfig: AppConfig
    ) {}

    getCategoryList(limit: number): Observable<BEResponse<CategoryList>> {
        return this._http.get<BEResponse<CategoryList>>(this._appConfig.baseUrl + `/categories?limit=${ limit }`);
    }
}
