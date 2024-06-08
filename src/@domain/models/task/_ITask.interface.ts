import { IEntity, IEntityConvertible } from '@core/interfaces';
import { PRIORITY } from '@application/constants';
import { Dayjs } from 'dayjs';

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
  createdTime: Dayjs;
  dueDate: Dayjs;
  priority: PRIORITY;
}
