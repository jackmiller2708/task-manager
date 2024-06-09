import { TaskListActionCellComponent } from '@presentation/components/task-list-action-cell/task-list-action-cell.component';
import { PriorityBadgeComponent } from '@presentation/components/priority-badge/priority-badge.component';
import { _getPriorityMatcher } from '@application/utility';
import { ColDef } from 'ag-grid-community';
import { ITask } from '@application/models';
import { DateTime } from 'luxon';

export const TASK_LIST_COL_DEFS: ColDef<ITask>[] = [
  {
    checkboxSelection: true,
    headerCheckboxSelection: true,
    width: 40,
    resizable: false,
    cellClass: 'flex flex-col justify-center',
  },
  {
    field: 'title',
    resizable: false,
    cellClass: 'flex flex-col justify-center',
  },
  {
    field: 'priority',
    width: 100,
    resizable: false,
    headerClass: '[&_.ag-header-cell-label]:justify-center',
    cellClass: 'flex flex-col justify-center text-center',
    cellRenderer: PriorityBadgeComponent,
  },
  {
    field: 'description',
    cellClass: 'flex flex-col justify-center',
    resizable: false,
    flex: 1,
  },
  {
    field: 'dueDate',
    resizable: false,
    cellClass: 'flex flex-col justify-center',
    valueFormatter: ({ value }) => (value as DateTime).toFormat('DD'),
  },
  {
    headerName: 'Actions',
    resizable: false,
    headerClass: '[&_.ag-header-cell-label]:justify-center',
    cellClass: 'flex flex-col justify-center',
    cellRenderer: TaskListActionCellComponent,
  },
];
