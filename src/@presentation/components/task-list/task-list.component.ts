import type { ColDef, SelectionChangedEvent } from 'ag-grid-community';
import type { Map as ImmutableMap } from "immutable";
import type { OnDestroy, OnInit } from '@angular/core'
import type { Observable } from 'rxjs';
import type { IAppState } from '@presentation/interfaces';
import type { ITask } from '@application/models';

// biome-ignore lint/style/useImportType: Needed for deps injection
import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { TaskActions, selectTasks } from '@presentation/stores';
import { storeRegisterFactory } from '@presentation/utility';
import { TASK_LIST_COL_DEFS } from '@presentation/constants';
import { AgGridAngular } from 'ag-grid-angular';
import { Subject } from 'rxjs';
import { List } from 'immutable';
// biome-ignore lint/style/useImportType: Needed for deps injection
import { Store } from '@ngrx/store';

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
  private readonly _tasks$: Observable<ImmutableMap<string, ITask>>;
  private _dataSource: ITask[];

  readonly colDefs: ColDef<ITask>[];

  get dataSource(): ITask[] {
    return this._dataSource;
  }

  constructor(
    private readonly _store: Store<IAppState>,
    private readonly _cdr: ChangeDetectorRef
  ) {
    this._onDestroy$ = new Subject();
    this._tasks$ = this._store.select(selectTasks);

    this.colDefs = TASK_LIST_COL_DEFS;
    this._dataSource = [];
  }

  ngOnInit(): void {
    this._initStore();
  }

  ngOnDestroy(): void {
    this._onDestroy$.next();
  }

  onSelectionChanged(event: SelectionChangedEvent<ITask>) {
    this._store.dispatch(
      TaskActions.selectTasks({ tasks: List(event.api.getSelectedRows()) })
    );
  }

  private _onDataSourceUpdate(dataSource: ImmutableMap<string, ITask>) {
    this._dataSource = dataSource.valueSeq().toArray();
    this._cdr.detectChanges();
  }

  private _initStore() {
    const register = storeRegisterFactory.call(this, this._onDestroy$);

    register(this._tasks$, this._onDataSourceUpdate);
  }
}
