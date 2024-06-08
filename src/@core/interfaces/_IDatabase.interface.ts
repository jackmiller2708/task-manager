import { createRxDatabase } from 'rxdb';

export type Database = Awaited<ReturnType<typeof createRxDatabase>>;