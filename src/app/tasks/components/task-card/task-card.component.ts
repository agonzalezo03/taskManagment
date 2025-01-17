import { Component, inject, Input } from '@angular/core';
import { Task } from '../../interfaces/task.interdace';
import { Router } from '@angular/router';

@Component({
  selector: 'app-task-card',
  templateUrl: './task-card.component.html',
  styleUrl: './task-card.component.css'
})
export class TaskCardComponent {

  @Input() task !:Task

  private route = inject(Router)

  detail(){
    console.log('eee')
    this.route.navigateByUrl(`task/detail/${this.task.id}`)
  }
}
