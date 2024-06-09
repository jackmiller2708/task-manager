import { IEntity, IEntityConvertible } from '@core/interfaces';
import { PRIORITY } from '@application/constants';
import { DateTime } from 'luxon';

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
