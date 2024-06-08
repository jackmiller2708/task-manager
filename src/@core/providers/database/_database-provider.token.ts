import { InjectionToken } from '@angular/core';
import { RxDatabase } from 'rxdb';

export const APP_DATABASE = new InjectionToken<RxDatabase>('app.database');
