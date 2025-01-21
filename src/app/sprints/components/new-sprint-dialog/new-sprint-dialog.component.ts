import { Component, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SprintFormComponent } from '../sprint-form/sprint-form.component';

@Component({
  selector: 'app-new-sprint-dialog',
  templateUrl: './new-sprint-dialog.component.html',
  styleUrl: './new-sprint-dialog.component.css'
})
export class NewSprintDialogComponent {
readonly dialog = inject(MatDialog);
  openDialog(): void {
    const dialogRef = this.dialog.open( SprintFormComponent, {
      data: {},
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if (result !== undefined) {

      }
    });
  }
}
