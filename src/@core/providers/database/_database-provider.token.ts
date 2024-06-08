import { InjectionToken } from '@angular/core';
import { RxDatabase } from 'rxdb';

export const APP_DATABASE = new InjectionToken<Promise<RxDatabase>>('app.database');
