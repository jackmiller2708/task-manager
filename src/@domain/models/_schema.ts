import type { IEntityCollection } from "@core/interfaces";

import { TaskSchema, migrateV1 } from "./task/_Task.schema";

export const schemas = {
  task: {
    schema: TaskSchema,
    migrationStrategies: { 1: migrateV1 },
  },
};

export type AppEntityCollection = IEntityCollection<typeof schemas>;
