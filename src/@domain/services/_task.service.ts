import type { AppEntityCollection } from '@application/models/_schema';
import type { ITask, ITaskEntity } from '@application/models/task/_ITask.interface';
import type { RxCollection } from 'rxdb';
import type { Observable } from 'rxjs';

import {  first, from, map, of, switchMap } from 'rxjs';
// biome-ignore lint/style/useImportType: Needed for deps injection.
import { DatabaseService } from '@core/services';
import { Injectable } from '@angular/core';
import { Option } from 'effect';
import { Task } from '@application/models';
import { List } from 'immutable';

@Injectable({ providedIn: 'root' })
export class TaskService {
  private readonly repo$: Observable<RxCollection<ITaskEntity>>;

  constructor(private readonly _dbService: DatabaseService<AppEntityCollection>) {
    this.repo$ = this._dbService.db$.pipe(map((db) => db.task), first());
  }

  /**
   * Retrieves all tasks from the repository.
   *
   * @return An Observable that emits a list of tasks.
   */  
  findAll(): Observable<List<ITask>> {
    return this.repo$.pipe(
      switchMap((repo) => from(repo.find().exec())),
      map(collection => List(collection.map(doc => Task.fromEntity(doc.getLatest()._data)))),
    );
  }

  /**
   * Adds a new task to the repository.
   *
   * @param task - The task object to be added.
   * @return An observable that emits the added task.
   */
  add(task: ITask): Observable<ITask> {
    return this.repo$.pipe(
      switchMap((repo) => from(repo.insert({ ...task.toEntity() }))),
      map(doc => Task.fromEntity(doc.getLatest()._data))
    );
  }

  /**
   * Updates a task by its ID.
   *
   * @param task - The task object to be updated.
   * @return An observable that emits the updated task.
   */
  update(task: ITask): Observable<ITask> {
    const { id, ...updateData } = task.toEntity();

    return this.repo$.pipe(
      switchMap((repo) => from(repo.findOne({ selector: { id: { $eq: id }} }).patch(updateData))),
      map(Option.fromNullable),
      map(maybeDoc => maybeDoc.pipe(Option.map(doc => Task.fromEntity(doc.getLatest()._data)), Option.getOrThrow))
    );
  }

  /**
   * Deletes a task by its ID.
   *
   * @param id - The ID of the task to be deleted.
   * @return An observable that emits an option containing the deleted task, if it exists.
   */
  delete(id: string): Observable<Option.Option<ITask>> {
    return this.repo$.pipe(
      switchMap((repo) => from(repo.findOne({ selector: { id: { $eq: id } } }).exec())),
      map((doc) => Option.fromNullable(doc)),
      switchMap((maybeDoc) => maybeDoc.pipe(
        Option.map((doc) => from(doc.remove()).pipe(map((removedDoc) => Option.some(removedDoc)))), 
        Option.getOrElse(() => of(Option.none())))
      ),
      map((maybeDoc) => maybeDoc.pipe(Option.map(Task.fromEntity)))
    );
  }

  /**
   * Deletes multiple tasks in bulk based on the provided task IDs.
   *
   * @param taskIds - The list of task IDs to be deleted.
   * @return An observable that emits a list of deleted tasks.
   */
  bulkDelete(taskIds: List<string>): Observable<List<ITask>> {
    return this.repo$.pipe(
      switchMap((repo) => from(repo.find({ selector: { $or: taskIds.map((id) => ({ id })).toArray() } }).remove())),
      map(collection => List(collection.map(doc => Task.fromEntity(doc.getLatest()._data)))),
    );
  }
}
