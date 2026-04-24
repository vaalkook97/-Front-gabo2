import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { basicAuthInterceptor } from './auth.interceptor';
import { API_BASE_URL } from './app.tokens';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideHttpClient(withInterceptors([basicAuthInterceptor])),
    {
      provide: API_BASE_URL,
      useValue: '/api/v1'
    }
  ]
};
