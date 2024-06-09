import { Component, OnDestroy, OnInit } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { TaskInputModalComponent } from '../task-input-modal/task-input-modal.component';
import { storeRegisterFactory } from '@presentation/utitlity';
import { selectSelectedTasks } from '@presentation/stores';
import { ICellRendererParams } from 'ag-grid-community';
import { Observable, Subject } from 'rxjs';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { IAppState } from '@presentation/interfaces';
import { MatDialog } from '@angular/material/dialog';
import { Option } from 'effect';
import { ITask } from '@application/models';
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

  agInit(params: ICellRendererParams<any, any, any>): void {
    this._value = Option.some(params.data);
  }

  refresh(params: ICellRendererParams<any, any, any>): boolean {
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
