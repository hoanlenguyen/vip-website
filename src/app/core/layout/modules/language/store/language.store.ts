import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { TranslateService } from '@ngx-translate/core';
import { VIP_LANG } from '@shared-app/data-access/constants';
import { VIPLocalStorageService } from '@shared-app/data-access/services';
import { tap } from 'rxjs';
import { LanguageState, LANGUAGES_ENUM } from './language.state';

@Injectable()
export class VIPLanguageStoreService extends ComponentStore<LanguageState> {

    readonly languageList$ = this.select((state) => state.languageList);

    readonly currentLanguage$ = this.select((state) => state.currentLanguage);

    readonly vm$ = this.select(
        this.languageList$,
        this.currentLanguage$,
        (languageList, currentLanguage) => ({ languageList, currentLanguage })
    );

    private readonly _initializeEffect = this.effect<LANGUAGES_ENUM>((trigger$) => 
        trigger$.pipe(
            tap((currentLanguage) => {
                let translateCode = '';
                switch (currentLanguage) {
                    case 1:
                        translateCode = 'en';
                        break;
                    case 2:
                        translateCode = 'th';
                        break;
                    default:
                        break;
                }
                this._translate.setDefaultLang(translateCode);
                this.patchState({ currentLanguage });
                this._localStorage.setItem(VIP_LANG, currentLanguage);
            })
        )
    );

    readonly changeLanguageEffect = this.effect<LANGUAGES_ENUM>((trigger$) => 
        trigger$.pipe(
            tap((currentLanguage) => this.patchState({ currentLanguage }))
        )
    )
    constructor(
        private readonly _localStorage: VIPLocalStorageService,
        private readonly _translate: TranslateService
    ) {
        super(initialLanguageState);
        this._initializeEffect(this.currentLanguage$);
    }
}

export const initialLanguageState: LanguageState = {
    languageList: [
        {name: 'English', value: LANGUAGES_ENUM.ENGLISH},
        {name: 'Thailand', value: LANGUAGES_ENUM.THAILAND}
    ],
    currentLanguage: LANGUAGES_ENUM.ENGLISH
};