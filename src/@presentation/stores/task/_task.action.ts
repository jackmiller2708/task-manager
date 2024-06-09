import { createActionGroup, props } from '@ngrx/store';
import { List, Map } from 'immutable';
import { ITask } from '@application/models';

export const TaskActions = createActionGroup({
  source: 'Tasks',
  events: {
    'Populate Tasks': props<Readonly<{ tasks: Map<string, ITask> }>>(),
    'Select Tasks': props<Readonly<{ tasks: List<ITask> }>>(),
    'Add Task': props<Readonly<{ task: ITask }>>(),
    'Modify Task': props<Readonly<{ task: ITask }>>(),
    'Delete Task': props<Readonly<{ id: string }>>(),
  },
});
