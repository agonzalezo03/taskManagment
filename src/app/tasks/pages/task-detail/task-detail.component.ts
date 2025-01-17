import { Component, inject, Inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TasksService } from '../../services/tasks.service';
import { Task } from '../../interfaces/task.interdace';
import { State } from '../../interfaces/state.enum';
import { CdkDragDrop, transferArrayItem } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-task-detail',
  templateUrl: './task-detail.component.html',
  styleUrl: './task-detail.component.css'
})
export class TaskDetailComponent implements OnInit{
  taskId!: string;
  task: Task = {
    id: '',
    name: '',
    description: '',
    difficulty: 0,
    assign: [],
    categories: [],
    epicId: '',
    state: State.pending,
    sprintId: ''
  }

  private taskService = inject(TasksService)
    public tasksPending :Task[] = [];
    public tasksCurse   :Task[] = [];
    public tasksEnd     :Task[] = [];
    public states = State


  constructor(private route: ActivatedRoute) {

  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.taskId = params.get('id') || '';
      console.log('ID de la tarea:', this.taskId);
      this.loadTask();
    });

    this.loadTasks();
  }

  loadTask(){
    this.taskService.getTaskId(this.taskId).subscribe(res => {
      this.task = res[0]
    })
  }

  loadTasks(){
    console.log("e")
    this.taskService.getTasks().subscribe( tasks => {
      console.log(tasks)
      this.tasksPending = tasks.filter( item => item.state === State.pending && item.epicId === this.task.id);
      this.tasksCurse = tasks.filter( item => item.state === State.curse && item.epicId === this.task.id);
      this.tasksEnd = tasks.filter( item => item.state === State.end && item.epicId === this.task.id);
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
