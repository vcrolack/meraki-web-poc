import { Component, Inject, inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';

@Component({
  selector: 'app-modal',
  imports: [MatDialogModule],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css',
})
export class ModalComponent {
  readonly dialog = inject(MatDialog);

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: { id: string; delete: (id: string) => void }
  ) {}

  openDialog(id: string) {
    const dialogRef = this.dialog.open(ModalComponent);
  }

  onConfirm() {
    console.log(this.data.delete);
    this.data.delete(this.data.id);
  }
}
