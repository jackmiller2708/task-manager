import { createReducer, on } from '@ngrx/store';
import { TaskActions } from './_task.action';
import { ITask } from '@application/models';
import { Map } from 'immutable';

export const tasksReducer = createReducer(
  Map<string, ITask>(),
  on(TaskActions.populateTasks, (state, { tasks }) => state.merge(tasks)),
  on(TaskActions.addTask, (state, { task }) => state.set(task.id, task)),
  on(TaskActions.modifyTask, (state, { task }) => state.set(task.id, task)),
  on(TaskActions.deleteTask, (state, { id }) => state.remove(id))
);
