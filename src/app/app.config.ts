import {
  ApplicationConfig,
  inject,
  isDevMode,
  provideAppInitializer,
  provideBrowserGlobalErrorListeners,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter, withInMemoryScrolling } from '@angular/router';
import { provideTransloco, translocoConfig } from '@jsverse/transloco';

import { routes } from './app.routes';
import { LanguageService } from './core/i18n/language.service';
import { TranslocoHttpLoader } from './core/i18n/transloco-http.loader';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideHttpClient(),
    provideRouter(
      routes,
      withInMemoryScrolling({
        scrollPositionRestoration: 'top',
        anchorScrolling: 'enabled',
      }),
    ),
    provideTransloco({
      config: translocoConfig({
        availableLangs: ['es', 'en', 'eu'],
        defaultLang: 'es',
        fallbackLang: 'es',
        reRenderOnLangChange: true,
        prodMode: !isDevMode(),
      }),
      loader: TranslocoHttpLoader,
    }),
    provideAppInitializer(() => inject(LanguageService).init()),
  ],
};
