import { Component, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { RoleFormComponent } from '../role-form/role-form.component';

@Component({
  selector: 'app-new-rol-dialog',
  templateUrl: './new-rol-dialog.component.html',
  styleUrl: './new-rol-dialog.component.css'
})
export class NewRolDialogComponent {
readonly dialog = inject(MatDialog);
  openDialog(): void {
    const dialogRef = this.dialog.open( RoleFormComponent, {
      data: {},
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if (result !== undefined) {

      }
    });
  }
}
