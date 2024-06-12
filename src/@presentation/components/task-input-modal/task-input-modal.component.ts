import type { IAppState } from '@presentation/interfaces';

// biome-ignore lint/style/useImportType: Need for injection
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Component, Inject } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
// biome-ignore lint/style/useImportType: Need for injection
import { TaskService } from '@application/services/task/task.service';
import { TaskActions } from '@presentation/stores';
import { type ITask, Task } from '@application/models';
// biome-ignore lint/style/useImportType: Need for injection
import { DialogRef } from '@angular/cdk/dialog';
import { PRIORITY } from '@application/constants';
import { DateTime } from 'luxon';
import { Option } from 'effect';
// biome-ignore lint/style/useImportType: Need for injection
import { Store } from '@ngrx/store';

const imports = [
  MatInputModule,
  MatSelectModule,
  MatFormFieldModule,
  MatDatepickerModule,
  MatButtonModule,
  ReactiveFormsModule,
];

@Component({
  selector: 'app-task-input-modal',
  standalone: true,
  templateUrl: './task-input-modal.component.html',
  styleUrl: './task-input-modal.component.scss',
  host: { class: '!flex flex-col gap-2 rounded-lg py-3 px-6' },
  imports,
})
export class TaskInputModalComponent {
  private readonly _form: ReturnType<typeof this._initForm>;

  get actionName() {
    return Option.match(this._data, {
      onSome: () => 'Edit',
      onNone: () => 'Add',
    });
  }

  get form() {
    return this._form;
  }

  constructor(
    @Inject(MAT_DIALOG_DATA) private readonly _data: Option.Option<ITask>,
    private readonly _dialogRef: DialogRef<TaskInputModalComponent>,
    private readonly _formBuilder: FormBuilder,
    private readonly _taskService: TaskService,
    private readonly _store: Store<IAppState>
  ) {
    this._form = this._initForm(this._data);
  }

  onFormSubmit() {
    if (!this._form.valid) {
      return;
    }

    this._submit(this._form.value as Partial<ITask>).subscribe({
      next: (data) => Option.match(this._data, {
        onSome: () => this._store.dispatch(TaskActions.addTask({ task: data })),
        onNone: () => this._store.dispatch(TaskActions.modifyTask({ task: data })),
      }),
      complete: () => this._dialogRef.close()
    });
  }

  private _submit(formValue: Partial<ITask>) {
    return Option.match(this._data, {
      onSome: (data) => this._taskService.update(new Task(({ ...data, ...formValue }))),
      onNone: () => this._taskService.add(new Task(formValue)),
    });
  }

  private _initForm(initData: Option.Option<ITask>) {
    return this._formBuilder.group(Option.match(initData, {
      onSome: ({ title, description, dueDate, priority }) => ({
        title: [title, [Validators.required]],
        description: [description],
        dueDate: [dueDate],
        priority: [priority, [Validators.required]],
      }),
      onNone: () => ({
        title: ['', [Validators.required]],
        description: [''],
        dueDate: [DateTime.now().endOf('day'), [Validators.required]],
        priority: [PRIORITY.MEDIUM, [Validators.required]],
      }),
    }));
  }
}
