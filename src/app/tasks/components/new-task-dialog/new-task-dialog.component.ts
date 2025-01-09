import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { TaskFormComponent } from '../task-form/task-form.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-new-task-dialog',
  templateUrl: './new-task-dialog.component.html',
  styleUrl: './new-task-dialog.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewTaskDialogComponent {
  readonly dialog = inject(MatDialog);
  openDialog(): void {
    const dialogRef = this.dialog.open(TaskFormComponent, {
      data: {},
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if (result !== undefined) {

      }
    });
  }
}
