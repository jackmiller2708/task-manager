import type { List, Map as ImmutableMap } from 'immutable';
import type { ITask } from '@application/models';

import { createActionGroup, props } from '@ngrx/store';

export const TaskActions = createActionGroup({
  source: 'Tasks',
  events: {
    'Populate Tasks': props<Readonly<{ tasks: ImmutableMap<string, ITask> }>>(),
    'Select Tasks': props<Readonly<{ tasks: List<ITask> }>>(),
    'Add Task': props<Readonly<{ task: ITask }>>(),
    'Modify Task': props<Readonly<{ task: ITask }>>(),
    'Delete Task': props<Readonly<{ id: string }>>(),
    'Bulk Delete Task': props<Readonly<{ taskIds: List<string> }>>()
  },
});