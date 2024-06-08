import { Injectable, inject } from '@angular/core';
import { APP_DATABASE } from '@core/providers/database';
import { Database } from '@core/interfaces';

@Injectable({ providedIn: 'root' })
export class DatabaseService {
  readonly db: Database;

  constructor() {
    this.db = inject(APP_DATABASE);
  }
}
