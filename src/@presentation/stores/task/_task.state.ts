import type { ITask } from '@application/models';

import { List, Map as ImmutableMap, Record } from 'immutable';

interface ITaskState {
  tasks: ImmutableMap<string, ITask>;
  selectedTasks: List<ITask>;
}

export const taskStateFactory = Record<ITaskState>({
  selectedTasks: List(),
  tasks: ImmutableMap(),
});
