import type { ICellRendererAngularComp } from "ag-grid-angular";
import type { ICellRendererParams } from "ag-grid-community";

import { _getStatusMatcher } from "@application/utility";
import { Component } from "@angular/core";
import { STATUS } from "@application/constants";
import { Option } from "effect";

import classNames from "classnames";

@Component({
  selector: "app-status-badge",
  standalone: true,
  template: "<span [className]='statusClass'>{{ value }}</span>",
})
export class StatusBadgeComponent implements ICellRendererAngularComp {
  private readonly _match: ReturnType<typeof _getStatusMatcher>;
  private _value?: STATUS;

  get statusClass() {
    return classNames('flex rounded-xl w-15 h-6 items-center justify-center uppercase font-black text-[18px] font-mono', {
      'text-[#198754]': this._value === STATUS.OPEN,
      'text-[#FFC107]': this._value === STATUS.IN_PROGRESS,
      'text-[#DC3545]': this._value === STATUS.DONE,
    });
  }

  get value(): string | undefined {
    return Option.fromNullable(this._value).pipe(
      Option.map((status) => this._match({ status })),
      Option.getOrUndefined
    );
  }

  constructor() {
    this._match = _getStatusMatcher();
  }

  agInit(params: ICellRendererParams): void {
    this._value = params.value;
  }
  refresh(params: ICellRendererParams): boolean {
    this._value = params.value;
    return true;
  }
}
