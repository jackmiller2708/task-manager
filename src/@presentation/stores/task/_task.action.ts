import { createActionGroup, props } from '@ngrx/store';
import { ITask } from '@application/models';
import { Map } from 'immutable';

export const TaskActions = createActionGroup({
  source: 'Tasks',
  events: {
    'Populate Tasks': props<Readonly<{ tasks: Map<string, ITask> }>>(),
    'Add Task': props<Readonly<{ task: ITask }>>(),
    'Modify Task': props<Readonly<{ task: ITask }>>(),
    'Delete Task': props<Readonly<{ id: string }>>(),
  },
});
