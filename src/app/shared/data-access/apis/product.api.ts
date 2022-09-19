import { HttpClient } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { BEResponse, Product, ProductList } from "@shared-app/data-access/models";
import { AppConfig, APP_CONFIG } from "@shared-app/di";
import { Observable } from "rxjs";

@Injectable({ providedIn: 'root' })
export class VIPProductAPI {

    constructor(
        private readonly _http: HttpClient,
        @Inject(APP_CONFIG) private readonly _appConfig: AppConfig
    ) { }

    getProductById(productId: string): Observable<BEResponse<Product>> {
        return this._http.get<BEResponse<Product>>(this._appConfig.baseUrl + `/products/${ productId }`)
    }

    getProductsByCategoryIds(categoryIds: number[], page?: number): Observable<BEResponse<ProductList>> {
        let url: string = '';
        const category_ids = categoryIds.map((categoryId) => {
            return `category_ids[]=${categoryId}`
        }).join('&');
        if (page) {
            url = `/products?${ category_ids }?page=${ page }`;
        } else {
            url = `/products?${ category_ids }`
        }
        return this._http.get<BEResponse<ProductList>>(this._appConfig.baseUrl + url);
    }

    getProductsByProductIds(productIds: number[]): Observable<BEResponse<ProductList>> {
        const product_ids = productIds.map((productIds) => {
            return `product_ids[]=${productIds}`
        }).join('&');
        return this._http.get<BEResponse<ProductList>>(this._appConfig.baseUrl + `/products?${ product_ids }`);
    }
}
