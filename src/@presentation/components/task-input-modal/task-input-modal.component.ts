import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { Component } from '@angular/core';

@Component({
  selector: 'app-task-input-modal',
  standalone: true,
  imports: [MatInputModule, MatSelectModule, MatFormFieldModule, MatDatepickerModule],
  templateUrl: './task-input-modal.component.html',
  styleUrl: './task-input-modal.component.scss',
  host: {
    class: '!flex flex-col gap-2 rounded-lg py-2 px-4'
  }
})
export class TaskInputModalComponent {}
