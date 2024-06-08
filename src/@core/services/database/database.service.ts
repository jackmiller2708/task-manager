import { CollectionsOfDatabase, RxDatabase } from 'rxdb';
import { Injectable, inject } from '@angular/core';
import { APP_DATABASE } from '@core/providers/database';

@Injectable({ providedIn: 'root' })
export class DatabaseService<T extends CollectionsOfDatabase> {
  readonly db: RxDatabase<T>;

  constructor() {
    this.db = inject(APP_DATABASE) as any;
  }
}
