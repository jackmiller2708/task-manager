import { ITask } from '@application/models';
import { List, Map, Record } from 'immutable';

interface ITaskState {
  tasks: Map<string, ITask>;
  selectedTasks: List<ITask>;
}

export const taskStateFactory = Record<ITaskState>({
  selectedTasks: List(),
  tasks: Map(),
});
