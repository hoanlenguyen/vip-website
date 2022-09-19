import { NgDompurifySanitizer } from "@tinkoff/ng-dompurify";
import { TuiRootModule, TuiDialogModule, TuiAlertModule, TUI_SANITIZER, tuiIconsPathFactory, TUI_ICONS_PATH } from "@taiga-ui/core";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { HttpClientModule } from '@angular/common/http';
import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { provideAuthInterceptor } from '@app-core/interceptors/auth.interceptor';
import { environment } from '@environments/environment';
import { getAppConfigProvider } from '@shared-app/di';
import { VIPCustomError, VIPTranslateModule } from '@shared-app/utils';
import { VIPAppComponent } from './app.component';
import { VIPCoreModule } from './core/core.module';


export const ANGULAR_MODULES = [
  BrowserAnimationsModule,
  BrowserModule,
  RouterModule,
  HttpClientModule,
];

export const VIP_MODULES = [
  VIPCoreModule,
  VIPTranslateModule.forRoot()
];

export const TUI_MODULES = [
  TuiRootModule,
  TuiDialogModule,
  TuiAlertModule
]

@NgModule({
  declarations: [
    VIPAppComponent
  ],
  imports: [
    ...ANGULAR_MODULES,
    ...VIP_MODULES,
    ...TUI_MODULES
],
  providers: [
    getAppConfigProvider(environment),
    provideAuthInterceptor,
    {
      provide: ErrorHandler,
      useClass: VIPCustomError
    },
    {
      provide: TUI_ICONS_PATH,
      useValue: tuiIconsPathFactory('https://taiga-ui.dev/assets/taiga-ui/icons'),
    },
    {
      provide: TUI_SANITIZER,
      useClass: NgDompurifySanitizer,
    },
],
  bootstrap: [VIPAppComponent]
})
export class AppModule { }
