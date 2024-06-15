import type { OnDestroy, OnInit } from '@angular/core'
import type { Observable } from 'rxjs';
import type { IAppState } from '@presentation/interfaces';
import type { ITask } from '@application/models';

// biome-ignore lint/style/useImportType: Need for injection
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Output } from '@angular/core';
import { storeRegisterFactory } from '@presentation/utility';
import { selectSelectedTasks } from '@presentation/stores';
import { Subject } from 'rxjs';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
// biome-ignore lint/style/useImportType: Need for injection
import { Store } from '@ngrx/store';
import { List } from 'immutable';

@Component({
  selector: 'app-task-list-toolbar',
  standalone: true,
  imports: [MatButtonModule, MatIconModule],
  templateUrl: './task-list-toolbar.component.html',
  styleUrl: './task-list-toolbar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskListToolbarComponent implements OnInit, OnDestroy {
  private readonly _selectedTasks$: Observable<List<ITask>>;
  private readonly _onDestroy$: Subject<void>;
  private _selectedTasks: List<ITask>;

  @Output()
  readonly addBtnClick: EventEmitter<void>;

  @Output()
  readonly deleteBtnClick: EventEmitter<List<ITask>>;

  get selectedTask() {
    return this._selectedTasks;
  }

  constructor(
    private readonly _store: Store<IAppState>,
    private readonly _cdr: ChangeDetectorRef
  ) {
    this._selectedTasks$ = this._store.select(selectSelectedTasks);
    this._onDestroy$ = new Subject();
    this._selectedTasks = List();
    
    this.addBtnClick = new EventEmitter();
    this.deleteBtnClick = new EventEmitter();
  }

  ngOnInit(): void {
    this._initStore();
  }

  ngOnDestroy(): void {
    this._onDestroy$.next();
  }

  private _onSelectedTasksChange(tasks: List<ITask>) {
    this._selectedTasks = tasks;
    this._cdr.detectChanges();
  }

  private _initStore() {
    const register = storeRegisterFactory.call(this, this._onDestroy$);

    register(this._selectedTasks$, this._onSelectedTasksChange);
  }
}
