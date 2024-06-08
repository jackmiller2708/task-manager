import { ApplicationConfig } from '@angular/core';
import { provideDatabase } from '@core/providers/database';
import { provideRouter } from '@angular/router';
import { provideStore } from '@ngrx/store';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideStore(), provideDatabase()],
};
