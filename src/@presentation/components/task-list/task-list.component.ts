import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { ColDef, SelectionChangedEvent } from 'ag-grid-community';
import { TaskActions, selectTasks } from '@presentation/stores';
import { storeRegisterFactory } from '@presentation/utitlity';
import { Observable, Subject } from 'rxjs';
import { TASK_LIST_COL_DEFS } from '@presentation/constants';
import { AgGridAngular } from 'ag-grid-angular';
import { IAppState } from '@presentation/interfaces';
import { List, Map } from 'immutable';
import { ITask } from '@application/models';
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
  private readonly _tasks$: Observable<Map<string, ITask>>;
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

  private _onDataSourceUpdate(dataSource: Map<string, ITask>) {
    this._dataSource = dataSource.valueSeq().toArray();
    console.log(this._dataSource)
    this._cdr.detectChanges();
  }

  private _initStore() {
    const register = storeRegisterFactory.call(this, this._onDestroy$);

    register(this._tasks$, this._onDataSourceUpdate);
  }
}
