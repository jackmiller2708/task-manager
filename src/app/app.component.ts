import type { OnInit } from "@angular/core";
import type { ITask } from "@application/models";
import type { List } from "immutable";

import { ConfirmModalComponent, TaskListComponent, TaskListToolbarComponent } from "@presentation/components";
// biome-ignore lint/style/useImportType: Needed for deps injection
import { MatDialog, MatDialogModule } from "@angular/material/dialog";
import { TaskInputModalComponent } from "@presentation/components/task-input-modal/task-input-modal.component";
import { orchestrateBulkDelete } from "@presentation/utility";
import { Map as ImmutableMap } from "immutable";
// biome-ignore lint/style/useImportType: Needed for deps injection
import { TaskService } from "@application/services";
import { TaskActions } from "@presentation/stores";
import { Component } from "@angular/core";
import { Option } from "effect";
// biome-ignore lint/style/useImportType: Needed for deps injection
import { Store } from "@ngrx/store";
import { map } from "rxjs";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.scss",
  standalone: true,
  imports: [MatDialogModule, TaskListComponent, TaskListToolbarComponent],
})
export class AppComponent implements OnInit {
  constructor(
    private readonly _dialog: MatDialog,
    private readonly _store: Store,
    private readonly _taskService: TaskService,
  ) {}

  ngOnInit(): void {
    this._taskService
      .findAll()
      .pipe(map((list) => list.reduce((acc, item) => acc.set(item.id, item), ImmutableMap<string, ITask>())))
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
      .pipe(orchestrateBulkDelete(this._taskService))
      .subscribe({
        next: (removedIds) => this._store.dispatch(
          TaskActions.bulkDeleteTask({ taskIds: removedIds }),
        ),
      });
  }
}
