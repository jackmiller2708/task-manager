import { ConstructableValuesOf, RawObjOf } from '@core/interfaces';
import { Dayjs, default as dayjs } from 'dayjs';
import { ITask, ITaskEntity } from './_ITask.interface';
import { PRIORITY } from '@application/constants';

export class Task implements ITask {
  readonly id: string;
  readonly title: string;
  readonly description: string;
  readonly dueDate: Dayjs;
  readonly createdTime: Dayjs;
  readonly priority: PRIORITY;

  constructor(values?: ConstructableValuesOf<ITask>) {
    this.id = values?.id ?? Date.now().toString();
    this.title = values?.title ?? '';
    this.description = values?.description ?? '';
    this.dueDate = values?.dueDate ?? dayjs();
    this.createdTime = values?.createdTime ?? dayjs();
    this.priority = values?.priority ?? PRIORITY.MEDIUM;
  }

  static fromEntity(values?: Partial<Readonly<RawObjOf<ITaskEntity>>>) {
    return new Task({
      ...values,
      dueDate: dayjs(values?.dueDate),
      createdTime: dayjs(values?.createdTime),
    });
  }

  toEntity(): Readonly<RawObjOf<ITaskEntity>> {
    return {
      ...this,
      dueDate: this.dueDate.toISOString(),
      createdTime: this.createdTime.toISOString(),
    };
  }
}
