import { databaseProviderFactory } from './_database-provider.factory';
import { APP_DATABASE } from './_database-provider.token';
import type { RxJsonSchema } from 'rxdb';
import type { Provider } from '@angular/core';
import { Effect } from 'effect';

export function provideDatabase(schemas: { [name: string]: RxJsonSchema<any>; }): Provider {
  return {
    provide: APP_DATABASE,
    useFactory: () => Effect.runPromise(databaseProviderFactory(schemas)),
  };
}
