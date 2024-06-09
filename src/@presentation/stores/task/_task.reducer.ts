import { createReducer, on } from '@ngrx/store';
import { taskStateFactory } from './_task.state';
import { TaskActions } from './_task.action';

export const tasksReducer = createReducer(
  taskStateFactory(),
  on(TaskActions.populateTasks, (state, { tasks }) => state.update('tasks', (_tasks) => _tasks.merge(tasks))),
  on(TaskActions.selectTasks, (state, { tasks }) => state.set('selectedTasks', tasks)),
  on(TaskActions.addTask, (state, { task }) => state.update('tasks', (_task) => _task.set(task.id, task))),
  on(TaskActions.modifyTask, (state, { task }) => state.update('tasks', (_task) => _task.set(task.id, task))),
  on(TaskActions.deleteTask, (state, { id }) => state.update('tasks', (_task) => _task.remove(id)))
);
