import type { IEntityCollection } from '@core/interfaces';
import { TaskSchema } from './task/_Task.schema';

export const schemas = {
  task: TaskSchema,
};

export type AppEntityCollection = IEntityCollection<typeof schemas>;
