import { ConfirmModalComponent, TaskCreateModalComponent, TaskListComponent } from '@presentation/components';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  standalone: true,
  imports: [TaskCreateModalComponent, ConfirmModalComponent, TaskListComponent],
})
export class AppComponent {
  constructor() {}
}
