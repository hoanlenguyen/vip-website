export interface LanguageState {
    languageList: Language[],
    currentLanguage: LANGUAGES_ENUM
}

export interface Language {
    name: string;
    value: LANGUAGES_ENUM;
}

export enum LANGUAGES_ENUM {
    ENGLISH = 1,
    THAILAND = 2
}