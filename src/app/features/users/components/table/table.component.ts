import { Component, Input, SimpleChanges, inject } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { User } from '../../interfaces/user.interface';
import { RouterLinkWithHref } from '@angular/router';
import { JsonPipe } from '@angular/common';
import { ModalComponent } from '../modal/modal.component';
import { MatDialog } from '@angular/material/dialog';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-table',
  imports: [MatTableModule, RouterLinkWithHref],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css',
})
export class TableComponent {
  readonly dialog = inject(MatDialog);
  readonly userService = inject(UserService);

  @Input() columns!: string[];
  @Input() users!: User[];

  openDialog(id: string) {
    const dialogRef = this.dialog.open(ModalComponent, {
      data: { id, delete: this.deleteUser.bind(this) },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.users = this.users.filter((user) => user.id !== id);
      }
    });
  }

  deleteUser(id: string) {
    return this.userService.delete(id).subscribe();
  }
}
