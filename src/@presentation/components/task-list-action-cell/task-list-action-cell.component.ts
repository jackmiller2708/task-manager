import type { ICellRendererAngularComp } from 'ag-grid-angular';
import type { ICellRendererParams } from 'ag-grid-community';
import type { OnDestroy, OnInit } from '@angular/core';
import type { Observable } from 'rxjs';
import type { IAppState } from '@presentation/interfaces';
import type { ITask } from '@application/models';

import { TaskInputModalComponent } from '../task-input-modal/task-input-modal.component';
import { storeRegisterFactory } from '@presentation/utility';
import { selectSelectedTasks } from '@presentation/stores';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
// biome-ignore lint/style/useImportType: Need for injection
import { MatDialog } from '@angular/material/dialog';
import { Component } from "@angular/core";
import { Subject } from 'rxjs'
import { Option } from 'effect';
// biome-ignore lint/style/useImportType: Need for injection
import { Store } from '@ngrx/store';
import { List } from 'immutable';

@Component({
  selector: 'app-task-list-action-cell',
  standalone: true,
  imports: [MatButtonModule, MatIconModule],
  templateUrl: './task-list-action-cell.component.html',
  styleUrl: './task-list-action-cell.component.scss',
  host: {
    class: 'h-full w-full flex items-center justify-center gap-2',
  },
})
export class TaskListActionCellComponent implements ICellRendererAngularComp, OnInit, OnDestroy {
  private readonly _onDestroy$: Subject<void>;
  private readonly _selectedTasks$: Observable<List<ITask>>;
  private _value: Option.Option<ITask>;
  private _selectedTasks: List<ITask>;

  get shouldDisableAction() {
    return this._selectedTasks.size > 1;
  }

  constructor(
    private readonly _dialog: MatDialog,
    private readonly _store: Store<IAppState>
  ) {
    this._selectedTasks$ = this._store.select(selectSelectedTasks);
    this._onDestroy$ = new Subject();
    this._value = Option.none();
    this._selectedTasks = List();
  }

  ngOnInit(): void {
    this._iniStore();
  }

  ngOnDestroy(): void {
    this._onDestroy$.next()
  }

  agInit(params: ICellRendererParams): void {
    this._value = Option.some(params.data);
  }

  refresh(params: ICellRendererParams): boolean {
    this._value = Option.some(params.data);
    return true;
  }

  onEditBtnClick() {
    this._dialog.open(TaskInputModalComponent, { data: this._value });
  }

  private _onSelectedTasksChange(tasks: List<ITask>) {
    this._selectedTasks = tasks;
  }

  private _iniStore() {
    const register = storeRegisterFactory.call(this, this._onDestroy$);

    register(this._selectedTasks$, this._onSelectedTasksChange);
  }
}
