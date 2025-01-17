import { Component, inject, OnInit } from '@angular/core';
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

  private taskService = inject(TasksService)
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
      this.tasksPending = tasks.filter( item => item.state === State.pending && item.epicId === undefined);
      this.tasksCurse = tasks.filter( item => item.state === State.curse && item.epicId === undefined);
      this.tasksEnd = tasks.filter( item => item.state === State.end && item.epicId === undefined);
    })
  }

  drop(event: CdkDragDrop<Task[]>) {
    const previousContainer = event.previousContainer;
    const targetContainer = event.container;
    const targetElement: HTMLElement = targetContainer.element.nativeElement;
    const destinationState = targetElement.getAttribute('data-state');

    if (previousContainer === targetContainer) {
      transferArrayItem(previousContainer.data, targetContainer.data, event.previousIndex, event.currentIndex);
    } else {
      const task = event.item.data;
      task.state = destinationState;

      this.taskService.updateTasks(task).subscribe(res => {
        console.log(res)
      });

      transferArrayItem(previousContainer.data, targetContainer.data, event.previousIndex, event.currentIndex);
    }
  }




}
