import { InjectionToken, ValueProvider } from "@angular/core";

export interface AppConfig {
    production: boolean
    baseUrl: string;
}

export const APP_CONFIG = new InjectionToken<AppConfig>('vip-webstie.config');

export const getAppConfigProvider = (value: AppConfig): ValueProvider => ({
    provide: APP_CONFIG,
    useValue: value
})