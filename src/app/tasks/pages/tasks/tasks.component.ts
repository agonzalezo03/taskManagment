import { Component, OnInit } from '@angular/core';
import { TasksService } from '../../services/tasks.service';
import { Task } from '../../interfaces/task.interdace';
import { State } from '../../interfaces/state.enum';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css'
})
export class TasksComponent implements OnInit {

  public tasksPending :Task[] = [];
  public tasksCurse   :Task[] = [];
  public tasksEnd     :Task[] = [];
  public states = State

  ngOnInit(): void {
    this.loadTasks()
  }
  constructor(private tasksService: TasksService){
    this.loadTasks()
  }

  loadTasks(){
    console.log("e")
    this.tasksService.getTasks().subscribe( tasks => {
      this.tasksPending = tasks.filter( item => item.state === State.pending);
      this.tasksCurse = tasks.filter( item => item.state === State.curse);
      this.tasksEnd = tasks.filter( item => item.state === State.end);
    })
  }




}
