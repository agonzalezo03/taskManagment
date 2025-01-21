import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Sprint } from '../../interfaces/sprint.interface';
import { SprintsService } from '../../services/sprints.service';
import { v4 as uuidv4 } from 'uuid';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { TasksService } from '../../../tasks/services/tasks.service';
import { Task } from '../../../tasks/interfaces/task.interdace';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';


@Component({
  selector: 'app-sprint-form',
  templateUrl: './sprint-form.component.html',
  styleUrl: './sprint-form.component.css',
  providers: [provideNativeDateAdapter()],
})
export class SprintFormComponent implements OnInit{
readonly dialogRef = inject(MatDialogRef<SprintFormComponent>);
  private fb = inject(FormBuilder);
  private sprintService = inject(SprintsService)
  private taskService = inject(TasksService)

  readonly separatorKeysCodes: number[] = [ENTER, COMMA];

  public sprintForm: FormGroup;
  public allTasks: Task[] = []
  public selectedTasks: Task[] = []

    constructor() {
      this.sprintForm = this.fb.group({
        name: ['', [Validators.required, Validators.minLength(3)]],
        description: [''],
        dateRange: this.fb.group({
          startDate: [null, Validators.required],
          endDate: [null, Validators.required]
        }),
        tasks: [[]]
      });
    }

  ngOnInit(): void {
    this.taskService.getTasks().subscribe(res => {
      this.allTasks = res
    })
  }

    addSprint(){
      const sprint: Sprint = {
        name: this.sprintForm.value.name,
        description: this.sprintForm.value.description,
        startDate: this.formatDate(this.sprintForm.value.dateRange.startDate),
        endDate: this.formatDate(this.sprintForm.value.dateRange.endDate),
        id: uuidv4()
      }
      this.sprintService.addSprint(sprint).subscribe(res => {
        console.log(res)
        this.selectedTasks.forEach(task => {
          task.sprintId = sprint.id
          this.taskService.updateTasks(task).subscribe(resT => {
            console.log(resT)
          })
        })
      })
    }

    addTask(taskName: string): void {
      const task = this.allTasks.find(tsk => tsk.name.toLowerCase() === taskName.toLowerCase());
      if (task && !this.selectedTasks.find(tsk => tsk.id === task.id)) {
        this.sprintForm.controls['tasks'].setValue('');
        this.selectedTasks.push(task);
      } else {
        console.log('El usuario ya está asignado o no existe');
      }
    }

    selectedTask(event: MatAutocompleteSelectedEvent): void {
        const task = event.option.value;
        console.log(task)
        if (task && !this.selectedTasks.find(tsk => tsk.id === task.id)) {
          this.selectedTasks.push(task);
          this.sprintForm.controls['tasks'].setValue('');
          console.log('Categorías seleccionadas:', this.selectedTasks);
        } else {
          this.sprintForm.controls['tasks'].setValue('');
          console.log('La categoría ya está seleccionada o no existe');
        }
      }

      removeTask(task: Task): void {
          this.selectedTasks = this.selectedTasks.filter(tsk => tsk.id !== task.id);
        }

    formatDate(date: Date): string {
      const day = String(date.getDate()).padStart(2, '0');
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const year = date.getFullYear();
      return `${day}-${month}-${year}`;
    }


    onNoClick(): void {
      this.dialogRef.close();
    }
}
