import { createFeatureSelector } from '@ngrx/store';
import { ITask } from '@application/models';
import { Map } from 'immutable';

export const selectTasks = createFeatureSelector<Map<string, ITask>>('tasks');
