import { InjectionToken } from '@angular/core';
import { Database } from '@core/interfaces';

export const APP_DATABASE = new InjectionToken<Database>('app.database');
