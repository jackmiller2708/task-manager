import type { CollectionsOfDatabase, RxDatabase } from 'rxdb';

import { dbInstanceResolver } from '@core/resolvers';
import { Injectable, inject } from '@angular/core';
import { APP_DATABASE } from '@core/providers/database';
import { Observable } from 'rxjs';
import { Effect } from 'effect';

@Injectable({ providedIn: 'root' })
export class DatabaseService<T extends CollectionsOfDatabase> {
  readonly db$: Observable<RxDatabase<T>>;

  constructor() {
    const awaitingDbInstance = inject(APP_DATABASE);

    this.db$ = new Observable<RxDatabase<T>>(subscriber => {
      Effect.runPromise(dbInstanceResolver(awaitingDbInstance))
        .then((dbInstance) => subscriber.next(dbInstance as unknown as RxDatabase<T>))
        .catch((error) => subscriber.error(error));
    });
  }
}
