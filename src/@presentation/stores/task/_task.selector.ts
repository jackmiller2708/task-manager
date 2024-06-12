import type { IAppState } from '@presentation/interfaces';

import { createSelector } from '@ngrx/store';

export const selectTasks = createSelector(
  (state: IAppState) => state.tasks,
  (tasks) => tasks.tasks
);

export const selectSelectedTasks = createSelector(
  (state: IAppState) => state.tasks,
  (tasks) => tasks.selectedTasks
);
