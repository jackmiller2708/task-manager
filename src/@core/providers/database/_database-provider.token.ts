import type { RxDatabase } from "rxdb";

import { InjectionToken } from "@angular/core";

export const APP_DATABASE = new InjectionToken<Promise<RxDatabase>>(
  "app.database",
);
