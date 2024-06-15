import type { ApplicationConfig } from "@angular/core";

import { provideLuxonDateAdapter } from "@angular/material-luxon-adapter";
import { provideAnimations } from "@angular/platform-browser/animations";
import { provideDatabase } from "@core/providers";
import { provideRouter } from "@angular/router";
import { tasksReducer } from "@presentation/stores";
import { provideStore } from "@ngrx/store";
import { schemas } from "@application/models/_schema";
import { routes } from "./app.routes";

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideStore({ tasks: tasksReducer }),
    provideDatabase(schemas),
    provideAnimations(),
    provideLuxonDateAdapter(),
  ],
};
