import { createSelector } from '@ngrx/store';
import { IAppState } from '@presentation/interfaces';

export const selectTasks = createSelector(
  (state: IAppState) => state.tasks,
  (tasks) => tasks.tasks
);

export const selectSelectedTasks = createSelector(
  (state: IAppState) => state.tasks,
  (tasks) => tasks.selectedTasks
);
