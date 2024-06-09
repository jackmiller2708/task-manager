import { Component, EventEmitter, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-task-list-toolbar',
  standalone: true,
  imports: [MatButtonModule, MatIconModule],
  templateUrl: './task-list-toolbar.component.html',
  styleUrl: './task-list-toolbar.component.scss',
})
export class TaskListToolbarComponent {
  @Output()
  readonly addBtnClick: EventEmitter<void>;

  constructor() {
    this.addBtnClick = new EventEmitter();
  }
}
