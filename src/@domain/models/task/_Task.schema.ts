import { RxJsonSchema } from 'rxdb';
import { PRIORITY } from '@application/constants';
import { ITaskEntity } from './_ITask.interface';

export const TaskSchema: RxJsonSchema<ITaskEntity> = {
  version: 0,
  primaryKey: 'id',
  type: 'object',
  properties: {
    id: { 
      type: 'string', 
      maxLength: 100 
    },
    title: {
      type: 'string'
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