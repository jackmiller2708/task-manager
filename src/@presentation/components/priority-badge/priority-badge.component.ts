import type { ICellRendererAngularComp } from 'ag-grid-angular';
import type { ICellRendererParams } from 'ag-grid-community';

import { _getPriorityMatcher } from '@application/utility';
import { Component } from '@angular/core';
import { PRIORITY } from '@application/constants';
import { Option } from 'effect';

import classNames from 'classnames';

@Component({
  selector: 'app-priority-badge',
  standalone: true,
  template: '<span [class]="priorityClass">{{ value }}</span>',
})
export class PriorityBadgeComponent implements ICellRendererAngularComp {
  private readonly _match: ReturnType<typeof _getPriorityMatcher>;
  private _value?: PRIORITY;

  get priorityClass() {
    return classNames('flex rounded-xl text-white w-15 h-6 items-center justify-center', {
      'bg-[#198754]': this._value === PRIORITY.LOW,
      'bg-[#FFC107]': this._value === PRIORITY.MEDIUM,
      'bg-[#DC3545]': this._value === PRIORITY.HIGH,
    });
  }

  get value(): string | undefined {
    return Option.fromNullable(this._value).pipe(
      Option.map((priority) => this._match({ priority })),
      Option.getOrUndefined
    );
  }

  constructor() {
    this._match = _getPriorityMatcher();
  }

  agInit(params: ICellRendererParams): void {
    this._value = params.value;
  }

  refresh(params: ICellRendererParams): boolean {
    this._value = params.value;
    return true;
  }
}
