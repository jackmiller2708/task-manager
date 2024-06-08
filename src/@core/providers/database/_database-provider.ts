import { addRxPlugin, createRxDatabase } from 'rxdb';
import { Provider, isDevMode } from '@angular/core';
import { getRxStorageDexie } from 'rxdb/plugins/storage-dexie';
import { APP_DATABASE } from './_database-provider.token';

export function provideDatabase(): Provider {
  return {
    provide: APP_DATABASE,
    useFactory: async () => {
      if (isDevMode()) {
        await import('rxdb/plugins/dev-mode').then((module) =>
          addRxPlugin(module.RxDBDevModePlugin)
        );
      }

      return await createRxDatabase({
        name: 'task-manager-storage',
        storage: getRxStorageDexie(),
      });
    },
  };
}
