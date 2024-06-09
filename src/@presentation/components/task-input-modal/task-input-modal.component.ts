import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Component, Inject } from '@angular/core';
import { Option } from 'effect';
import { ITask } from '@application/models';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-task-input-modal',
  standalone: true,
  templateUrl: './task-input-modal.component.html',
  styleUrl: './task-input-modal.component.scss',
  host: {
    class: '!flex flex-col gap-2 rounded-lg py-3 px-6',
  },
  imports: [
    MatInputModule,
    MatSelectModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatButtonModule,
  ],
})
export class TaskInputModalComponent {
  get actionName() {
    return Option.match(this._data, {
      onSome: () => 'Edit',
      onNone: () => 'Add',
    });
  }

  constructor(
    @Inject(MAT_DIALOG_DATA) private readonly _data: Option.Option<ITask>
  ) {}
}
