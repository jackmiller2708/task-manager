import { IEntity } from '@core/interfaces';

export interface ITask extends IEntity {
  description: string;
  dueDate: string;
  priority: number;
}
