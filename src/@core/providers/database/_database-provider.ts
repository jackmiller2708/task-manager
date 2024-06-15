import type { EntitySchemas } from '@core/interfaces';
import type { Provider } from '@angular/core';

import { databaseProviderFactory } from './_database-provider.factory';
import { APP_DATABASE } from './_database-provider.token';
import { Effect } from 'effect';

export function provideDatabase<T>(schemas: EntitySchemas<T>): Provider {
  return {
    provide: APP_DATABASE,
    useFactory: () => Effect.runPromise(databaseProviderFactory(schemas)),
  };
}
