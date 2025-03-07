import { ChangeDetectionStrategy, Component, inject, Input } from '@angular/core';
import { TaskFormComponent } from '../task-form/task-form.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-new-task-dialog',
  templateUrl: './new-task-dialog.component.html',
  styleUrl: './new-task-dialog.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewTaskDialogComponent {
  @Input() epicId!: string
  readonly dialog = inject(MatDialog);
  openDialog(): void {
    const dialogRef = this.dialog.open(TaskFormComponent, {
      data: {
        task: '',
        epicId: this.epicId
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if (result !== undefined) {

      }
    });
  }
}
