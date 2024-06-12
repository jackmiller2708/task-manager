import type { CollectionsOfDatabase, RxDatabase } from 'rxdb';

import { BehaviorSubject, type Observable, filter, from } from 'rxjs';
import { Injectable, inject } from '@angular/core';
import { Effect, Schedule } from 'effect';
import { APP_DATABASE } from '@core/providers/database';

@Injectable({ providedIn: 'root' })
export class DatabaseService<T extends CollectionsOfDatabase> {
  readonly db$: Observable<RxDatabase<T>>;

  constructor() {
    const awaitingDbInstance = inject(APP_DATABASE);
    const dbSubject$ = new BehaviorSubject<RxDatabase<T> | undefined>(undefined);

    from(Effect.promise(() => awaitingDbInstance).pipe(
      Effect.flatMap(db => Effect.if(Boolean(Object.keys(db.collections).length), {
        onTrue: () => Effect.succeed(db),
        onFalse: () => Effect.fail('Db not initialized!')
      })),
      effect => Effect.retry(effect, Schedule.fixed('100 millis')),
      Effect.runPromise
    )).subscribe({ next: db => dbSubject$.next(db as unknown as RxDatabase<T>) });

    this.db$ = dbSubject$.asObservable().pipe(filter(db => Boolean(db))) as Observable<RxDatabase<T>>;
  }
}
