import { Component, inject } from '@angular/core';
import { CategoriesFormComponent } from '../categories-form/categories-form.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-categories-dialog',
  templateUrl: './categories-dialog.component.html',
  styleUrl: './categories-dialog.component.css'
})
export class CategoriesDialogComponent {
readonly dialog = inject(MatDialog);
  openDialog(): void {
    const dialogRef = this.dialog.open(CategoriesFormComponent, {
      data: {},
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if (result !== undefined) {

      }
    });
  }
}
