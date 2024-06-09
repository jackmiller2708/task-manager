import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Task } from '@application/models';
import { TaskService } from '@application/services/task/task.service';
import { Store } from '@ngrx/store';
import { TaskActions } from '@presentation/stores';

@Component({
  selector: 'app-task-create-modal',
  standalone: true,
  imports: [],
  templateUrl: './task-create-modal.component.html',
  styleUrl: './task-create-modal.component.scss',
})
export class TaskCreateModalComponent {
  constructor(
    private readonly _dialogRef: MatDialogRef<TaskCreateModalComponent>,
    private readonly _store: Store,
    private readonly _taskService: TaskService
  ) {}

  onAddTaskBtnClick() {
    this._taskService
      .add(new Task({ title: 'Jack off bitch', description: 'No Desc' }))
      .subscribe({ 
        next: (task) => this._store.dispatch(TaskActions.addTask({ task })),
        complete: () => this._dialogRef.close()
      });
  }
}
