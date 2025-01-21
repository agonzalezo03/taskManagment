import { Component, inject, Input, OnInit } from '@angular/core';
import { Sprint } from '../../interfaces/sprint.interface';
import { Task } from '../../../tasks/interfaces/task.interdace';
import { TasksService } from '../../../tasks/services/tasks.service';

@Component({
  selector: 'app-sprint-panel',
  templateUrl: './sprint-panel.component.html',
  styleUrl: './sprint-panel.component.css'
})
export class SprintPanelComponent implements OnInit{

  public tasks: Task[] = []
  private taskService = inject(TasksService)


  @Input() sprint!:Sprint

  ngOnInit(): void {
    this.loadTasks()
  }

  loadTasks(){
    this.taskService.getTasks().subscribe(res => {
      this.tasks = res.filter(task => task.sprintId === this.sprint.id);
    })
  }
}
