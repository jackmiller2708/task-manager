import type { ITask } from '@application/models';
import type { List } from 'immutable';

// biome-ignore lint/style/useImportType: Needed for deps injection
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import { Option } from 'effect';

@Component({
  selector: 'app-confirm-modal',
  standalone: true,
  imports: [],
  templateUrl: './confirm-modal.component.html',
  styleUrl: './confirm-modal.component.scss',
})
export class ConfirmModalComponent {
  get dataSource() {
    return this._data;
  }

  constructor(
    @Inject(MAT_DIALOG_DATA) private readonly _data: List<ITask>,
    private readonly dialogRef: MatDialogRef<ConfirmModalComponent>
  ) {}

  onConfirmBtnClick() {
    this.dialogRef.close(Option.some(this._data.map(({ id }) => id)));
  }

  onCancelBtnClick() {
    this.dialogRef.close(Option.none());
  }
}
