import { ICellRendererAngularComp } from 'ag-grid-angular';
import { Component } from '@angular/core';
import { _getPriorityMatcher } from '@application/utility';
import { ICellRendererParams } from 'ag-grid-community';
import { PRIORITY } from '@application/constants';

import classNames from 'classnames';

@Component({
  selector: 'app-priority-badge',
  standalone: true,
  template: '<span [class]="priorityClass">{{ value }}</span>',
})
export class PriorityBadgeComponent implements ICellRendererAngularComp {
  private readonly match: ReturnType<typeof _getPriorityMatcher>;
  private _value?: PRIORITY;

  get priorityClass() {
    return classNames('px-2 py-1 rounded-xl text-white', {
      'bg-[#198754]': this._value === PRIORITY.LOW,
      'bg-[#FFC107]': this._value === PRIORITY.MEDIUM,
      'bg-[#DC3545]': this._value === PRIORITY.MEDIUM,
    });
  }

  get value(): string | undefined {
    return this._value ? this.match({ priority: this._value }) : undefined;
  }

  constructor() {
    this.match = _getPriorityMatcher();
  }

  agInit(params: ICellRendererParams<any, any, any>): void {
    this._value = params.value;
  }

  refresh(params: ICellRendererParams<any, any, any>): boolean {
    this._value = params.value;
    return true;
  }
}
