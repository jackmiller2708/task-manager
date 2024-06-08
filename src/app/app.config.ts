import { ApplicationConfig } from '@angular/core';
import { provideDatabase } from '@core/providers/database';
import { provideRouter } from '@angular/router';
import { tasksReducer } from '@presentation/stores';
import { provideStore } from '@ngrx/store';
import { schemas } from '@application/models/_schema';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideStore({ tasks: tasksReducer }),
    provideDatabase(schemas),
  ],
};
