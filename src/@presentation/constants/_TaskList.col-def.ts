import { ITask } from '@application/models';
import { ColDef } from 'ag-grid-community';

export const TASK_LIST_COL_DEFS: ColDef<ITask>[] = [
  { field: 'title' },
  { field: 'description' },
  { field: 'priority' },
  { field: 'dueDate' },
];
