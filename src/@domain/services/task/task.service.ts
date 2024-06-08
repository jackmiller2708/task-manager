import { Observable, from, map, of, switchMap } from 'rxjs';
import { AppEntityCollection } from '@application/models/_schema';
import { ITask, ITaskEntity } from '@application/models/task/_ITask.interface';
import { DatabaseService } from '@core/services/database/database.service';
import { RxCollection } from 'rxdb';
import { Injectable } from '@angular/core';
import { Option } from 'effect';
import { Task } from '@application/models';
import { List } from 'immutable';

@Injectable({ providedIn: 'root' })
export class TaskService {
  private readonly repo$: Observable<RxCollection<ITaskEntity>>;

  constructor(private readonly dbService: DatabaseService<AppEntityCollection>) {
    this.repo$ = dbService.db$.pipe(map((db) => db.task));
  }

  findAll(): Observable<List<ITask>> {
    return this.repo$.pipe(
      switchMap((repo) => from(repo.find().exec())),
      map(collection => List(collection.map(doc => Task.fromEntity(doc.getLatest()._data)))),
    );
  }

  add(task: ITask): Observable<ITask> {
    return this.repo$.pipe(
      switchMap((repo) => from(repo.insert({ ...task.toEntity() }))),
      map(doc => Task.fromEntity(doc.getLatest()._data))
    );
  }

  update(task: ITask): Observable<ITask> {
    return this.repo$.pipe(
      switchMap((repo) => from(repo.upsert({ ...task.toEntity() }))),
      map(doc => Task.fromEntity(doc.getLatest()._data))
    );
  }

  delete(id: string): Observable<Option.Option<ITask>> {
    return this.repo$.pipe(
      switchMap((repo) => from(repo.findOne({ selector: { id: { $eq: id } } }).exec())),
      map((doc) => Option.fromNullable(doc)),
      switchMap(maybeDoc => maybeDoc.pipe(
        Option.map(doc => from(doc.remove()).pipe(map(removedDoc => Option.some(removedDoc)))), 
        Option.getOrElse(() => of(Option.none())))
      ),
      map(maybeDoc => maybeDoc.pipe(Option.map(Task.fromEntity)))
    );
  }
}
