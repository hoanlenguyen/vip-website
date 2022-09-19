import { HttpClient } from "@angular/common/http";
import { ModuleWithProviders, NgModule } from "@angular/core";
import { TranslateLoader, TranslateModule } from "@ngx-translate/core";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";

export function HttpLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(http);
}

@NgModule({
    exports: [ TranslateModule ]
})
export class VIPTranslateModule {
    static forRoot(): ModuleWithProviders<VIPTranslateModule> {
        return {
            ngModule: VIPTranslateModule,
            providers: [
                TranslateModule.forRoot({
                    loader: {
                        provide: TranslateLoader,
                        useFactory: HttpLoaderFactory,
                        deps: [HttpClient]
                    }
                }).providers || []
            ]
        }
    }
    static forChild(): ModuleWithProviders<VIPTranslateModule> {
        return {
            ngModule: VIPTranslateModule,
            providers: [
                TranslateModule
            ]
        }
    }
}