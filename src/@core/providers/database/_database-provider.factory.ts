import type { RxCollectionCreator } from "rxdb";

import { addRxPlugin, createRxDatabase } from 'rxdb';
import { RxDBMigrationPlugin } from 'rxdb/plugins/migration-schema';
import { getRxStorageDexie } from 'rxdb/plugins/storage-dexie';
import { isDevMode } from '@angular/core';
import { Effect } from 'effect';

export function databaseProviderFactory(schemas: { [name: string]:  RxCollectionCreator<unknown>; }) {
  const dbStorage = getRxStorageDexie()

  const enableDevMode = Effect.promise(() => import('rxdb/plugins/dev-mode')).pipe(
    Effect.map(({ RxDBDevModePlugin }) => addRxPlugin(RxDBDevModePlugin)),
    Effect.tap(() => addRxPlugin(RxDBMigrationPlugin)),
  );

  const createDatabase = Effect.promise(() => createRxDatabase({ 
    name: 'task-manager-storage', 
    storage: dbStorage,
    multiInstance: false,
  }));

  return Effect.Do.pipe(
    Effect.andThen(() => Effect.if(isDevMode(), {
      onTrue: () => enableDevMode,
      onFalse: () => Effect.void,
    })),
    Effect.andThen(() => createDatabase),
    Effect.tap(db => void db.addCollections(
      Object.entries(schemas).reduce(
        (acc, [name, schemaCreator]) => Object.assign(acc, { [name]: { ...schemaCreator } }),
        {}
      )
    ))
  );
}
