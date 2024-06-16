import type { ConstructableValuesOf, RawObjOf } from "@core/interfaces";
import type { ITask, ITaskEntity } from "./_ITask.interface";

import { PRIORITY, STATUS } from "@application/constants";
import { DateTime } from "luxon";

export class Task implements ITask {
  readonly id: string;
  readonly title: string;
  readonly description: string;
  readonly dueDate: DateTime;
  readonly createdTime: DateTime;
  readonly priority: PRIORITY;
  readonly status: STATUS;

  constructor(values?: ConstructableValuesOf<ITask>) {
    this.id = values?.id ?? Date.now().toString();
    this.title = values?.title ?? "";
    this.description = values?.description ?? "";
    this.dueDate = values?.dueDate ?? DateTime.now();
    this.createdTime = values?.createdTime ?? DateTime.now();
    this.priority = values?.priority ?? PRIORITY.MEDIUM;
    this.status = values?.status ?? STATUS.OPEN;
  }

  static fromEntity(values?: Partial<Readonly<RawObjOf<ITaskEntity>>>) {
    return new Task({
      ...values,
      dueDate: DateTime.fromISO(values?.dueDate ?? new Date().toISOString()),
      createdTime: DateTime.fromISO(values?.createdTime ?? new Date().toISOString()),
    });
  }

  toEntity(): Readonly<RawObjOf<ITaskEntity>> {
    return {
      ...this,
      dueDate: this.dueDate.toISO(),
      createdTime: this.createdTime.toISO(),
    };
  }
}
