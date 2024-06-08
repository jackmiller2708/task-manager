import { RxJsonSchema } from 'rxdb';
import { PRIORITY } from '@application/constants';
import { ITask } from './_ITask.interface';

export const TaskSchema: RxJsonSchema<ITask> = {
  version: 0,
  primaryKey: 'id',
  keyCompression: true,
  type: 'object',
  properties: {
    id: { 
      type: 'string', 
      maxLength: 100 
    },
    createdTime: { 
      type: 'string' 
    },
    dueDate: { 
      type: 'string' 
    },
    description: { 
      type: 'string' 
    },
    priority: {
      type: 'number',
      enum: [PRIORITY.LOW, PRIORITY.MEDIUM, PRIORITY.HIGH],
    },
  },
};