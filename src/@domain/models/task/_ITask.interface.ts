import type { IEntity, IEntityConvertible } from '@core/interfaces';
import type { PRIORITY } from '@application/constants';
import type { DateTime } from 'luxon';

export interface ITaskEntity extends IEntity {
  title: string;
  description: string;
  dueDate: string;
  priority: number;
}

export interface ITask extends IEntityConvertible<ITaskEntity> {
  id: string;
  title: string;
  description: string;
  createdTime: DateTime;
  dueDate: DateTime;
  priority: PRIORITY;
}
