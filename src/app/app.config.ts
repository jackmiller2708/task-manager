import type { ApplicationConfig } from "@angular/core";

import { provideLuxonDateAdapter } from "@angular/material-luxon-adapter";
import { provideAnimations } from "@angular/platform-browser/animations";
import { provideDatabase } from "@core/providers";
import { tasksReducer } from "@presentation/stores";
import { provideStore } from "@ngrx/store";
import { schemas } from "@application/models/_schema";

export const appConfig: ApplicationConfig = {
  providers: [
    provideStore({ tasks: tasksReducer }),
    provideDatabase(schemas),
    provideAnimations(),
    provideLuxonDateAdapter(),
  ],
};
