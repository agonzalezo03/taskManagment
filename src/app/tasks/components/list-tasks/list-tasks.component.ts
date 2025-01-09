import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Task } from '../../interfaces/task.interdace';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { TasksService } from '../../services/tasks.service';

@Component({
  selector: 'app-list-tasks',
  templateUrl: './list-tasks.component.html',
  styleUrl: './list-tasks.component.css'
})
export class ListTasksComponent {
  @Input() taskList !:Task[]
  @Input() state !:string

  @Output() taskUpdated: EventEmitter<void> = new EventEmitter<void>();

  constructor(private taskSevice :TasksService){
    console.log(this.taskList)
  }

  drop(event: CdkDragDrop<Task[], any, any>) {  // Cambiar a Task[] en lugar de string[]
    console.log(event)
    console.log('Tarea arrastrada:', event.item.data);
  console.log('Contenedor anterior:', event.previousContainer.element.nativeElement);
  console.log('Contenedor de destino:', event.event.target, );
  const targetContainer = event.event.target as HTMLElement;
  const previusContainer = event.previousContainer.element.nativeElement as HTMLElement
  let task = event.item.data
  const destinationState = targetContainer.getAttribute('data-state');
  const previusState = previusContainer.getAttribute('data-state')

    if (previusState !== destinationState) {
      task = { ...task, state:destinationState,}
      this.taskSevice.updateTasks(task).subscribe(res => {
        console.log(res)
        this.taskUpdated.emit();
      })
      console.log(task)
    }
  }


}
