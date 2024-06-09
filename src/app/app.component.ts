import { ConfirmModalComponent, TaskCreateModalComponent, TaskListComponent, TaskListToolbarComponent } from '@presentation/components';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';
import { TaskService } from '@application/services/task/task.service';
import { TaskActions } from '@presentation/stores';
import { ITask } from '@application/models';
import { Store } from '@ngrx/store';
import { map } from 'rxjs';
import { Map } from 'immutable';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  standalone: true,
  imports: [
    MatDialogModule,
    TaskCreateModalComponent,
    ConfirmModalComponent,
    TaskListComponent,
    TaskListToolbarComponent,
  ],
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
      .subscribe({ next: tasks => this._store.dispatch(TaskActions.populateTasks({ tasks })) });
  }

  onAddBtnClick() {
    this._dialog.open(TaskCreateModalComponent);
  }
}
