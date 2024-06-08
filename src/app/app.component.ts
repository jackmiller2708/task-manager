import { RouterOutlet } from '@angular/router';
import { TaskService } from '@application/services/task/task.service';
import { Component } from '@angular/core';
import { Task } from '@application/models';
import { map, switchMap } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'task-manager';

  constructor(private readonly taskService: TaskService) {
    taskService
      .add(new Task({ title: 'task 1', description: 'first task' }))
      .pipe(switchMap(() => taskService.findAll()))
      .subscribe(list => console.log('createdTask', list.toJS()));
  }
}
