import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { storeRegisterFactory } from '@presentation/utitlity';
import { Observable, Subject } from 'rxjs';
import { TASK_LIST_COL_DEFS } from '@presentation/constants';
import { AgGridAngular } from 'ag-grid-angular';
import { selectTasks } from '@presentation/stores';
import { ColDef } from 'ag-grid-community';
import { ITask } from '@application/models';
import { Store } from '@ngrx/store';
import { Map } from 'immutable';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [AgGridAngular],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskListComponent implements OnInit, OnDestroy {
  private readonly _onDestroy$: Subject<void>;
  private readonly _tasks$: Observable<Map<string, ITask>>;
  private _dataSource: Map<string, ITask>;

  readonly colDefs: ColDef<ITask>[];

  get dataSource(): ITask[] {
    return this._dataSource.valueSeq().toArray();
  }

  constructor(
    private readonly _store: Store,
    private readonly _cdr: ChangeDetectorRef
  ) {
    this._onDestroy$ = new Subject();
    this._tasks$ = this._store.select(selectTasks);

    this.colDefs = TASK_LIST_COL_DEFS;
    this._dataSource = Map();
  }

  ngOnInit(): void {
    this._initStore();
  }

  ngOnDestroy(): void {
    this._onDestroy$.next();
  }

  private _onDataSourceUpdate(dataSource: Map<string, ITask>) {
    this._dataSource = dataSource;
    this._cdr.detectChanges();
  }

  private _initStore() {
    const register = storeRegisterFactory.call(this, this._onDestroy$);

    register(this._tasks$, this._onDataSourceUpdate);
  }
}
