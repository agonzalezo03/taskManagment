import { Component, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UserFormComponent } from '../user-form/user-form.component';

@Component({
  selector: 'app-new-user-dialog',
  templateUrl: './new-user-dialog.component.html',
  styleUrl: './new-user-dialog.component.css'
})
export class NewUserDialogComponent {
readonly dialog = inject(MatDialog);
  openDialog(): void {
    const dialogRef = this.dialog.open( UserFormComponent, {
      data: {},
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if (result !== undefined) {

      }
    });
  }
}
