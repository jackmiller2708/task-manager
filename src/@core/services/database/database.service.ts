import { BehaviorSubject, Observable, filter, from, switchMap } from 'rxjs';
import { CollectionsOfDatabase, RxDatabase } from 'rxdb';
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
    )).subscribe({ next: db => dbSubject$.next(db as any) });

    this.db$ = dbSubject$.asObservable().pipe(filter(db => Boolean(db))) as any;
  }
}
