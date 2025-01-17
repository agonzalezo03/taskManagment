import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CdkDragDrop, transferArrayItem } from '@angular/cdk/drag-drop';
import { Task } from '../../interfaces/task.interdace';
import { TasksService } from '../../services/tasks.service';

@Component({
  selector: 'app-list-tasks',
  templateUrl: './list-tasks.component.html',
  styleUrls: ['./list-tasks.component.css']
})
export class ListTasksComponent implements OnInit {
  @Input() taskList!: Task[];
  @Input() state!: string;
  @Output() taskUpdated: EventEmitter<void> = new EventEmitter<void>();

  connectedDropLists: string[] = [];

  constructor(private taskService: TasksService) {}

  ngOnInit() {
    this.connectedDropLists = ['pending', 'curse', 'end'].map(state => 'tasksDropList-' + state);
  }

  drop(event: CdkDragDrop<Task[]>) {
    const previousContainer = event.previousContainer;
    const targetContainer = event.container;

    if (previousContainer === targetContainer) {
      transferArrayItem(previousContainer.data, targetContainer.data, event.previousIndex, event.currentIndex);
    } else {
      const task = event.item.data;
      task.state = this.state;

      this.taskService.updateTasks(task).subscribe(() => {
        this.taskUpdated.emit();
      });

      transferArrayItem(previousContainer.data, targetContainer.data, event.previousIndex, event.currentIndex);
    }
  }
}
