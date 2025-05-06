import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), 
    // adding withComponentInputBinding() to enable use of input signal
    // to directly access route parameters.
    provideRouter(routes, withComponentInputBinding())
  ]
};

