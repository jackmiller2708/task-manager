import type { RxDatabase } from "rxdb";

import { DbInitializationError } from "@core/models";
import { Effect, Schedule } from "effect";

/**
 * Function to resolve the database instance.
 *
 * @param dbConnection - The promise for the database connection.
 * @return The effect representing the database instance.
 */
export function dbInstanceResolver<T extends object>(dbConnection: Promise<RxDatabase<T>>) {
  const initializeDb = Effect.tryPromise({
    try: () => dbConnection,
    catch: (error) => new DbInitializationError((error as Error).message),
  });

  const validateDbInstance = initializeDb.pipe(Effect.flatMap((db) =>
    Effect.if(Boolean(Object.keys(db.collections).length), {
      onTrue: () => Effect.succeed(db),
      onFalse: () => Effect.fail(new DbInitializationError("Db not initialized!")),
    }),
  ));

  // Retry to validate the database instance when fail to initialize.
  return Effect.retry(validateDbInstance, Schedule.fixed('100 millis'));
}
