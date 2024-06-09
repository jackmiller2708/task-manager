import { ConfirmModalComponent, TaskListComponent, TaskListToolbarComponent } from '@presentation/components';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { TaskInputModalComponent } from '@presentation/components/task-input-modal/task-input-modal.component';
import { map, switchMap } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { TaskService } from '@application/services/task/task.service';
import { TaskActions } from '@presentation/stores';
import { List, Map } from 'immutable';
import { Option } from 'effect';
import { ITask } from '@application/models';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  standalone: true,
  imports: [MatDialogModule, TaskListComponent, TaskListToolbarComponent],
})
export class AppComponent implements OnInit {
  constructor(
    private readonly _dialog: MatDialog,
    private readonly _store: Store,
    private readonly _taskService: TaskService
  ) {}

  ngOnInit(): void {
    this._taskService
      .findAll()
      .pipe(map((list) => list.reduce((acc, item) => acc.set(item.id, item), Map<string, ITask>())))
      .subscribe({
        next: (tasks) => this._store.dispatch(TaskActions.populateTasks({ tasks })),
      });
  }

  onAddBtnClick() {
    this._dialog.open(TaskInputModalComponent, { data: Option.none() });
  }

  onDeleteBtnClick(tasks: List<ITask>) {
    this._dialog
      .open(ConfirmModalComponent, { data: tasks })
      .afterClosed()
      .pipe(
        map((maybeIds: Option.Option<List<string>>) => Option.getOrElse(maybeIds, () => List<string>())),
        switchMap((ids) => this._taskService.bulkDelete(ids)),
        map((removedList) => removedList.map(({ id }) => id))
      )
      .subscribe({
        next: (removedIds) => this._store.dispatch(
          TaskActions.bulkDeleteTask({ taskIds: removedIds })
        )
      });
  }
}
