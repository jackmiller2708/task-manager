import { PriorityBadgeComponent } from '@presentation/components/priority-badge/priority-badge.component';
import { _getPriorityMatcher } from '@application/utility';
import { ColDef } from 'ag-grid-community';
import { ITask } from '@application/models';
import { Dayjs } from 'dayjs';

export const TASK_LIST_COL_DEFS: ColDef<ITask>[] = [
  { checkboxSelection: true, width: 40, resizable: false },
  { field: 'title' },
  { field: 'priority', cellRenderer: PriorityBadgeComponent },
  { field: 'description', flex: 1 },
  { field: 'dueDate', valueFormatter: ({ value }) => (value as Dayjs).format('ddd MM YYYY HH:mm:ss')},
];
