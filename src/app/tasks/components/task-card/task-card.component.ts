import { Component, inject, Input, OnInit } from '@angular/core';
import { Task } from '../../interfaces/task.interdace';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { TaskFormComponent } from '../task-form/task-form.component';

@Component({
  selector: 'app-task-card',
  templateUrl: './task-card.component.html',
  styleUrl: './task-card.component.css'
})
export class TaskCardComponent implements OnInit {


  @Input() task !:Task
  readonly dialog = inject(MatDialog);

  private route = inject(Router)

  detail(){
    console.log('eee')
    this.route.navigateByUrl(`task/detail/${this.task.id}`)
  }

  ngOnInit(): void {
    this.task.categories.sort((a, b) => {
      if (a === 'epic') return -1;
      if (b === 'epic') return 1;
      return 0;
    });
  }


    openDialog(): void {
      const dialogRef = this.dialog.open(TaskFormComponent, {
        data: {
          task: this.task
        },
      });

      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
        if (result !== undefined) {

        }
      });
    }
}
